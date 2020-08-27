# Shopgate Connect - sticky-pdp-media

This extension makes the media section on pdp sticky.

## Configuration

### scrolledTopOffset (string)
CSS value for 'top' property. It will move the image by this value to top when scrolled.
The value needs to match the image dimension settings from theme. -100vw works for 1024x1536 images

### scrollStyles (json)
Apply given styles to sticky media when scroll ratio is reached.

- `enabled` (boolean) Enable applying styles on scroll ratio
- `ratio` (number) Scroll ratio when apply styles
- `styles` (json css) Applying styles

Example:
```json
{
  "scrolledTopOffset": "-100vw",
  "scrollStyles": {
    "enabled": true,
    "ratio": 0.4,
    "styles": {
      "filter": "blur(3px)",
      "backdropFilter": "blur(3px)"
    }
  }
}
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
