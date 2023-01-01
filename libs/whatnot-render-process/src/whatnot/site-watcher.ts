import { logger } from "@app/logging";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {DomWatcher} from "./dom-watcher";

export class SiteWatcher {
  #watchedElement = document.querySelector("title") as HTMLTitleElement;
  #titleWatcher = new DomWatcher(this.#watchedElement, false)
  #urlChangeSubject: ReplaySubject<Location> = new ReplaySubject<Location>(1);

  #oldUrl = "";

  public get urlChanged(): Observable<Location> {
    return this.#urlChangeSubject.asObservable();
  }

  constructor() {
    logger.info("Constructing a new SiteWatcher object");
    this.handleTitleChange();

    this.#titleWatcher.allMutation.subscribe(this.handleTitleChange.bind(this));
  }

  private handleTitleChange() {
    if (this.#oldUrl != location.href) {
      logger.verbose(`Href changed from: ${this.#oldUrl} to ${location.href}`)

      this.#oldUrl = location.href;
      this.#urlChangeSubject.next(location);
    }
  }
}
