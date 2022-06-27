import { Injectable } from "@angular/core";
import { ListingService } from "./listings.service";

@Injectable({
  providedIn: "root",
})
export class Filter_AND_Aggregations {
  constructor(private listingService: ListingService) {}

  public getHttpSingleKeywordQuery(item) {
    return [
      {
        relation: "OR",
        children: [
          [
            {
              key: "post_variables",
              child: { key: "post_variables.name", value: item.filter },
            },
            {
              key: "post_variables",
              child: { key: "post_variables.value", value: item.value },
            },
          ],
        ],
      },
      {
        relation: "OR",
        children: [
          [
            {
              key: "uri_params",
              child: { key: "uri_params.name", value: item.filter },
            },
            {
              key: "uri_params",
              child: { key: "uri_params.value", value: item.value },
            },
          ],
        ],
      },
    ];
  }

  public getHttpAllKeywordsQuery(dateRange, till_now, tags) {
    const filters = [];
   
    for (let item of tags) {
      if(item?.isParam) continue;
      else if(item.filter !== 'Keyword') {
        if(item?.operator === "includes") {
          filters.push({ [item.filter]: item.value, operator: "like" });
        } else if(item?.operator === "not_equals") {
          filters.push({ [item.filter]: item.value, negation: true });
        } else {
          filters.push({ [item.filter]: item.value });
        }
      }
    }
    
    return [
      {
        SELECT: "count(*) as count, uri_params.name",
        JOIN: "uri_params",
        GROUP: "uri_params.name",
        ORDER: "count desc",
        WHERE: {
          AND: [
            ...filters,
            {
              date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
              operator: "between",
            },
          ],
        },
      },
      {
        SELECT: "count(*) as count, post_variables.name",
        JOIN: "post_variables",
        GROUP: "post_variables.name",
        ORDER: "count desc",
        WHERE: {
          AND: [
            ...filters,
            {
              date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
              operator: "between",
            },
          ],
        },
      }
    ];
  }

  public getHttpSpecificKeywordsQuery(dateRange, till_now, tags) {
    const filters = [];
    const keywordsList = [];
   
    for (let item of tags) {
      if(item?.isParam) continue;
      else if(item.filter === 'Keyword') keywordsList.push(item.value);
      else filters.push({ [item.filter]: item.value });
    }

    return [
      {
        SELECT: "count(*) as count, uri_params.name",
        JOIN: "uri_params",
        WHERE: {
          OR: [
            { "uri_params.name": [...this.listingService.httpSpecificKeywords, ...keywordsList], operator: "in" }
          ],
          AND: [
            ...filters,
            {
              date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
              operator: "between",
            },
          ],
        },
        GROUP: "uri_params.name",
        ORDER: "count desc",
      },
      {
        SELECT: "count(*) as count, post_variables.name",
        JOIN: "post_variables",
        WHERE: {
          OR: [
            { "post_variables.name": [...this.listingService.httpSpecificKeywords, ...keywordsList], operator: "in" }
          ],
          AND: [
            ...filters,
            {
              date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
              operator: "between",
            },
          ],
        },
        GROUP: "post_variables.name",
        ORDER: "count desc",
      }
    ];
  }

  getTopParams(hits) {
    let keywordsList = [];

    hits.forEach(hit => {
      hit.forEach(item => {
        const obj = {
          key: item["uri_params.name"] || item["post_variables.name"],
          doc_count: item["count"]
        };

        if(item["uri_params.name"]) obj["type"] = "URI Param";
        else if(item["post_variables.name"]) obj["type"] = "Post Variable";

        keywordsList.push(obj);
      });
    });

    return keywordsList;
  }

  public getGelocationsQuery(item) {
    return [
      {
        children: [
          [
            {
              key: "client_addr",
              values: item?.ip_list,
              relation: "OR",
            },
          ],
        ],
      },
      {
        relation: "OR",
        children: [
          [
            {
              key: "post_variables",
              child: {
                key: "post_variables.name",
                value: "(latitude OR lat)",
                operator: "custom",
              },
            },
            {
              key: "post_variables",
              child: {
                key: "post_variables.name",
                value: "(longitude OR lon)",
                operator: "custom",
              },
            },
          ],
        ],
      },
      {
        relation: "OR",
        children: [
          [
            {
              key: "uri_params",
              child: {
                key: "uri_params.name",
                value: "(latitude OR lat)",
                operator: "custom",
              },
            },
            {
              key: "uri_params",
              child: {
                key: "uri_params.name",
                value: "(longitude OR lon)",
                operator: "custom",
              },
            },
          ],
        ],
      },
    ];
  }

  public getTopIPsHostsQuery(dateRange, till_now, filters = [], host = false) {
    const data = [
      {
        SELECT: "count() as TopClients, client_addr",
        GROUP: "client_addr",
        ORDER: "TopClients desc",
        WHERE: {
          AND: [
            ...filters,
            {
              date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
              operator: "between",
            },
          ],
        },
      },
      {
        SELECT: "count(server_addr) as DestinationIPs, server_addr",
        GROUP: "server_addr",
        ORDER: "DestinationIPs desc",
        WHERE: {
          AND: [
            ...filters,
            {
              date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
              operator: "between",
            },
          ],
        },
      }
    ];
    if(host) {
      data.push(
        {
          SELECT: "count() as TopHosts, host",
          GROUP: "host",
          ORDER: "TopHosts desc",
          WHERE: {
            AND: [
              ...filters,
              {
                date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
                operator: "between",
              },
            ],
          },
        }
      );
    }
    return data;
  }

  getIPsHostsResult(hits) {
    const data = {sourceIPs: [], destIPs: [], hosts: []};

    hits[0].forEach(element => {
      data.sourceIPs.push({key: element?.client_addr, doc_count: element?.TopClients, name: element?.client_addr, value: element?.TopClients});
    });
    hits[1].forEach(element => {
      data.destIPs.push({key: element?.server_addr, doc_count: element?.DestinationIPs, name: element?.server_addr, value: element?.DestinationIPs});
    });
    if(hits[2]) {
      hits[2].forEach(element => {
        data.hosts.push({key: element?.element?.host, doc_count: element?.TopHosts, name: element?.host, value: element?.TopHosts});
      });  
    }

    return data;
  }

  public getEmailCredentialsQuery(item) {
    return [
      {
        children: [
          [
            {
              key: "client_addr",
              values: item?.ip_list,
              relation: "OR",
            },
          ],
        ],
      },
    ];
  }

  public getHttpCredentialsQuery(item) {
    return [
      {
        children: [
          [
            {
              key: "client_addr",
              values: item?.ip_list,
              relation: "OR",
            },
          ],
        ],
      },
      {
        key: "post_variables",
        child: {
          key: "post_variables.name",
          value: "username OR user OR uid OR email",
          operator: "custom",
        },
      },
      {
        key: "post_variables",
        child: {
          key: "post_variables.name",
          value: "password OR pwd OR pass",
          operator: "custom",
        },
      }
    ];
  }

  // Top Stats Queries
  getKeywordsQuery(dateRange, till_now) {
    return [...this.getHttpAllKeywordsQuery(dateRange, till_now, [])];
  }
  getProtocolsQuery(dateRange, till_now) {
    return {
      SELECT: "sum(total) as count, protocol",
      GROUP: "protocol",
      ORDER: "count desc",
      WHERE: {
        AND: [
          { exist: "protocol" },
          {
            protocol: ["http", "https", "udp", "tcp", "ssl"],
            operator: "in",
            negation: true,
          },
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    }
  }
  getProtocolsNonMaterializedQuery(dateRange, till_now) {
    return {
      SELECT: "count(*) as count, protocol",
      GROUP: "protocol",
      ORDER: "count desc",
      WHERE: {
        AND: [
          { exist: "protocol" },
          {
            protocol: ["http", "https", "udp", "tcp", "ssl"],
            operator: "in",
            negation: true,
          },
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    }
  }
  getHostsQuery(dateRange, till_now) {
    return {
      SELECT: "sum(total) as count, host",
      GROUP: "host",
      ORDER: "count desc",
      WHERE: {
        AND: [
          { exist: "host" },
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    }
  }
  getHostsNonMaterializedQuery(dateRange, till_now) {
    return {
      SELECT: "count(*) as count, host",
      GROUP: "host",
      ORDER: "count desc",
      WHERE: {
        AND: [
          { exist: "host" },
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    }
  }
  getWebDomainQuery(dateRange, till_now) {
    return {
      SELECT: "sum(total) as count, sni",
      GROUP: "sni",
      ORDER: "count desc",
      WHERE: {
        AND: [
          { exist: "sni" },
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    }
  }
  getWebDomainNonMaterializedQuery(dateRange, till_now) {
    return {
      SELECT: "count(*) as count, sni",
      GROUP: "sni",
      ORDER: "count desc",
      WHERE: {
        AND: [
          { exist: "sni" },
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    }
  }
  geSourceIPsQueryByFlowDirection(dateRange, till_now) {
    return {
      SELECT: "sum (total) as count, ip as client_addr",
      GROUP: "client_addr",
      ORDER: "count desc",
      WHERE: {
        AND: [
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    };
  }
  geSourceIPsQueryByFlowDirection_NonMaterialized(dateRange, till_now) {
    return {
      SELECT: "count(*) as count, client_addr",
      GROUP: "client_addr",
      ORDER: "count desc",
      WHERE: {
        AND: [
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    };
  }
  geSourceIPsQuery(dateRange, till_now) {
    return {
      SELECT: "sum (total) as count, client_ips as client_addr",
      GROUP: "client_addr",
      ORDER: "count desc",
      WHERE: {
        AND: [
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    };
  }
  geSourceIPsQuery_NonMaterialized(dateRange, till_now) {
    return {
      SELECT: "count(*) as count, client_addr",
      GROUP: "client_addr",
      ORDER: "count desc",
      WHERE: {
        AND: [
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    };
  }
  geDestinationIPsQuery(dateRange, till_now) {
    return {
      SELECT: "sum (total) as count, destination_ips as server_addr",
      GROUP: "server_addr",
      ORDER: "count desc",
      WHERE: {
        AND: [
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    };
  }
  geDestinationIPsQuery_NonMaterialized(dateRange, till_now) {
    return {
      SELECT: "count(*) as count, server_addr",
      GROUP: "server_addr",
      ORDER: "count desc",
      WHERE: {
        AND: [
          {
            date_time: [dateRange.start, !till_now ? dateRange.end : new Date()],
            operator: "between",
          },
        ],
      },
    };
  }

}
