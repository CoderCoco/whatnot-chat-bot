import {OnDestroy} from "@app/core";
import { logger } from "@app/logging";
import { Subject, Observable } from "rxjs";

// TODO: Document
export class DomWatcher implements OnDestroy {
  private allMutationSubject: Subject<MutationRecord> = new Subject<MutationRecord>();
  private nodeAddedSubject: Subject<Node> = new Subject<Node>();
  private nodeRemovedSubject: Subject<Node> = new Subject<Node>();

  public get allMutation(): Observable<MutationRecord> {
    return this.allMutationSubject.asObservable();
  }

  public get nodeAdded(): Observable<Node> {
    return this.nodeAddedSubject.asObservable();
  }

  public get nodeRemoved(): Observable<Node> {
    return this.nodeRemovedSubject.asObservable();
  }

  private readonly mutationObserver: MutationObserver;

  constructor(watchElement: HTMLElement, doesMonitorChildren = true) {
    logger.debug(`Constructing a new DomWatcher object on ${watchElement?.outerHTML}`)

    if( !watchElement || watchElement.nodeType !== 1 ) throw new Error("Unable to watch element!");

    // define a new observer
    this.mutationObserver = new MutationObserver(this.observerCallback.bind(this));

    // have the observer observe for changes in children
    this.mutationObserver.observe( watchElement, { childList: true, subtree: doesMonitorChildren })
  }

  public destroy() {
    logger.debug("Destroying a dom watcher");
    this.mutationObserver.disconnect();
    this.allMutationSubject.complete();
    this.nodeAddedSubject.complete();
    this.nodeRemovedSubject.complete();
  }

  private observerCallback(mutations: MutationRecord[]) {
    logger.debug("Mutations were observed");

    for (const mutation of mutations) {
      this.allMutationSubject.next(mutation);

      mutation.addedNodes.forEach((value) => {
        this.nodeAddedSubject.next(value);
      });

      mutation.removedNodes.forEach((value) => {
        this.nodeRemovedSubject.next(value);
      });
    }
  }
}
