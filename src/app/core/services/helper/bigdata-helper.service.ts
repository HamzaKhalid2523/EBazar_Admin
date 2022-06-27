import { Injectable } from "@angular/core";
import { ViewedEventsService } from "../api/bigdata/viewed-events.service";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class BigdataHelperService {

    constructor(
        private authService: AuthService,
        private viewedEventsService: ViewedEventsService
    ) {}

    ////////////// Process Filters (Key, Value, Operator) //////////////////
    getProcessedFilter(queryItems, tags, selectedFilter, selectedOperator, filterValue, selectedFilterId, tagUpdated, selectedKeyword?) {
        let obj: any = queryItems.find((e) => e.value === selectedFilter);
        let filterObj = { ...obj };

        if(!tagUpdated && (selectedFilter === "file_types_array" || selectedFilter === "is_viewed")) {
            tags = tags.filter((tag) => {
                if((tag.filter === "file_types_array" && selectedFilter === "file_types_array") ||
                (tag.filter === "is_viewed" && selectedFilter === "is_viewed")) return false;
                return tag;
            });
        }

        // For HTTP
        if (selectedKeyword && selectedFilter === "custom_keyword") {
            selectedFilter = selectedKeyword;
            selectedKeyword = null;
            filterObj.name = selectedFilter;
        }
        if (!filterObj && selectedFilter === "Keyword") {
            filterObj = {
                name: selectedFilter,
                value: filterValue,
            };
        }
        if (Object.keys(filterObj).length === 0) {
            filterObj["name"] = selectedFilter;
            filterObj["isParam"] = true;
        }

        let data = {};
        if (filterObj) {
            let op = ' = ';
            if(selectedOperator === 'not_equals') op = ' != ';
            else if(selectedOperator === 'includes') op = ' %includes% ';

            const tagText = filterObj.name + op + filterValue;

            data = {
                label: tagText,
                operator: selectedOperator,
                filter: selectedFilter,
                value: filterValue,
                id: selectedFilterId ? selectedFilterId : tags.length + 1,
                isParam: filterObj.isParam || false,
            };
        }

        return data;
    }
    ////////////////////////////////////////

    ////////////// Keyword Click, Record Selected, Saved Viewed Event //////////////////
    async handleKeyboardEvent(event, selectedEvent, records, recordItem) {
        const tempSelectedIndex = selectedEvent;

        switch(event.keyCode) {
            case 38:
                if(selectedEvent || selectedEvent === 0) {
                    records[selectedEvent].activeState = false;
                }
                event.preventDefault();
                break; //Up
            case 40:
                if(selectedEvent || selectedEvent === 0) {
                    records[selectedEvent].activeState = true;
                } else if(records.length) {
                    selectedEvent = 0;
                    records[selectedEvent].selectedState = true;
                    records[selectedEvent].activeState = true;
                }
                event.preventDefault();
                break; //Down
            case 39:
                if(selectedEvent || selectedEvent === 0) {
                    if(selectedEvent !== records.length-1) {
                        records[selectedEvent].activeState = false;
                        records[selectedEvent].selectedState = false;

                        selectedEvent++;
                        records[selectedEvent].activeState = true;
                        records[selectedEvent].selectedState = true;
                    } else {
                        records[selectedEvent].activeState = true;
                    }
                } else if(records.length) {
                    selectedEvent = 0;
                    records[selectedEvent].selectedState = true;
                    records[selectedEvent].activeState = true;
                }
                event.preventDefault();
                break; //Right
            case 37:
                if(selectedEvent || selectedEvent === 0) {
                    if(selectedEvent !== 0) {
                        records[selectedEvent].activeState = false;
                        records[selectedEvent].selectedState = false;

                        selectedEvent--;
                        records[selectedEvent].activeState = true;
                        records[selectedEvent].selectedState = true;
                    } else {
                        records[selectedEvent].activeState = false;
                    }
                } else if(records.length) {
                    selectedEvent = 0;
                    records[selectedEvent].selectedState = true;
                    records[selectedEvent].activeState = false;
                }
                event.preventDefault();
                break; //Left
        };
        if(selectedEvent !== tempSelectedIndex) {
            if(!records[selectedEvent]?.is_viewed) {
                const data = await this.saveViewedEvent(selectedEvent, records);
                return data;
            } else return {selectedEvent, records};
        } else return {selectedEvent, records};
    }

    async recordSelected(index, selectedEvent, records, recordItem) {
        if(index === selectedEvent) {
            records[index].selectedState = true;
            records[index].activeState = !records[index].activeState;
            return {selectedEvent, records};
        } else {
            records.forEach((item) => {
                item["activeState"] = false
                item["selectedState"] = false
            });

            records[index].activeState = true;
            records[index].selectedState = true;
            selectedEvent = index;

            if(!records[selectedEvent]?.is_viewed) {
                const data = await this.saveViewedEvent(selectedEvent, records);
                return data;
            } else return {selectedEvent, records};
        }
    }

    saveViewedEvent(selectedEvent, records): Promise<Object> {
        const viewedBy = this.authService.getLoginData()._id;
        const event = {...records[selectedEvent]};

        return new Promise((resolve, reject) => {
            if(!event.activeState) resolve({selectedEvent, records});
            this.viewedEventsService.createData({viewedBy, event, event_type: "radius"}).subscribe(
                () => {
                    records[selectedEvent]["is_viewed"] = true;
                    resolve({selectedEvent, records});
                }, (error) => {
                    console.log(error);
                    reject({selectedEvent, records})
                });
        });
    }
    ////////////////////////////////////////
}
