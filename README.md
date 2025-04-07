# Home Assistant Todo Card

A beautiful and functional todo card for your Home Assistant dashboard.

## Features

- Multiple todo lists with color coding
- Completed tasks section with clear all functionality
- Theme-aware styling
- Smooth animations and transitions
- Beautiful scrollbar for overflow content

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend" section
3. Click the "+" button
4. Search for "Todo Card"
5. Click "Install"

### Manual Installation

1. Download the `ha-todo-card.js` file from the latest release
2. Copy it to your `www/community/ha-todo-card/` folder
3. Add the following to your Lovelace resources:
   ```yaml
   resources:
     - url: /local/community/ha-todo-card/ha-todo-card.js
       type: module
   ```

## Usage

Add the card to your dashboard:

```yaml
type: custom:todo-card
title: My Tasks
lists:
  - name: Personal
    color: '#3B82F6'
  - name: Work
    color: '#10B981'
```

## Configuration Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | 'Tasks' | Card title |
| lists | array | [] | Array of todo lists |
| show_completed | boolean | true | Show completed tasks section |

### List Configuration

| Name | Type | Description |
|------|------|-------------|
| name | string | List name |
| color | string | List color (hex or CSS variable) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License