import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: "highlight" })
export class HighLightPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(list: any, searchText: string) {
    if (!list) {
      return [];
    }
    if (!searchText) {
      return list;
    }

    const value = list.replace(
      searchText,
      `<span style='background-color:#83a421; color:white'>${searchText}</span>`
    );

    if (list === "<None>") {
      return "< None >";
    } else {
      return this._sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
