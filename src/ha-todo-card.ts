import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRoot } from 'react-dom/client';
import App from './App';

@customElement('ha-todo-card')
export class HaTodoCard extends LitElement {
  @property({ type: String }) title = 'Tasks';
  @property({ type: Array }) lists = [];
  @property({ type: Boolean }) show_completed = true;
  @property({ type: Object }) gridSize = { rows: 1, cols: 1 };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  firstUpdated() {
    const mountPoint = document.createElement('div');
    this.shadowRoot?.appendChild(mountPoint);
    
    const root = createRoot(mountPoint);
    root.render(
      React.createElement(App, {
        title: this.title,
        lists: this.lists,
        showCompleted: this.show_completed,
        gridSize: this.gridSize
      })
    );
  }

  render() {
    return html`<div></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-todo-card': HaTodoCard;
  }
}