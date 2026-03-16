import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getRequiredElement } from '../../utils/dom';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;

  public constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesContainer = getRequiredElement<HTMLElement>('.sources');

    sourcesContainer.addEventListener('click', (e: MouseEvent) => {
      this.controller.getNews(e, (data) => this.view.drawNews(data));
    });

    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;

