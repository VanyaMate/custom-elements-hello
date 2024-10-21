import './index.css';
import { Router } from '@/component/shared/router/Router/ui/Router.ts';


customElements.define('web-router', Router);

document.querySelector<HTMLDivElement>('#app')!.append(new Router());
