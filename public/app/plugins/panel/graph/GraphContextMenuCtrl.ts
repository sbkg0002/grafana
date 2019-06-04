import { ContextMenuItem } from '@grafana/ui';

export interface FlotDataPoint {
  dataIndex: number;
  datapoint: number[];
  pageX: number;
  pageY: number;
  series: any;
  seriesIndex: number;
}

export class GraphContextMenuCtrl {
  private source?: FlotDataPoint | null;
  private scope?: any;
  menuItems: ContextMenuItem[];
  scrollContextElement: HTMLElement;
  position: {
    x: number;
    y: number;
  };

  isVisible: boolean;

  constructor($scope) {
    this.isVisible = false;
    this.menuItems = [];
    this.scope = $scope;
  }

  onClose = () => {
    if (this.scrollContextElement) {
      this.scrollContextElement.removeEventListener('scroll', this.onClose);
    }

    this.scope.$apply(() => {
      this.isVisible = false;
    });
  };

  toggleMenu = (event?: { pageX: number; pageY: number }) => {
    this.isVisible = !this.isVisible;
    if (this.isVisible && this.scrollContextElement) {
      this.scrollContextElement.addEventListener('scroll', this.onClose);
    }

    if (this.source) {
      this.position = {
        x: this.source.pageX,
        y: this.source.pageY,
      };
    } else {
      this.position = {
        x: event ? event.pageX : 0,
        y: event ? event.pageY : 0,
      };
    }
  };

  // Sets element which is considered as a scroll context of given context menu.
  // Having access to this element allows scroll event attachement for menu to be closed when user scrolls
  setScrollContextElement = (el: HTMLElement) => {
    this.scrollContextElement = el;
  };

  setSource = (source: FlotDataPoint | null) => {
    this.source = source;
  };

  setMenuItems = (items: ContextMenuItem[]) => {
    this.menuItems = items;
  };

  getMenuItems = () => {
    return this.menuItems;
  };
}