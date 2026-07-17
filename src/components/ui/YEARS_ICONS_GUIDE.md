# 15 Years Anniversary Icon Set

A premium icon collection with light and dark variants perfect for milestone celebrations and branding.

## Color Palette

### Dark Variant (Premium Black)
- **Background:** `#050300` (Near Black)
- **Accent:** `#DAB228` (Gold)

### Light Variant (Cream)
- **Background:** `#FFFBE0` (Cream)
- **Accent:** `#EEC630` (Bright Gold)

### Gradient Reference
- **Start:** `#F8E860`
- **Mid:** `#D09C18`
- **End:** `#8A6000`

## Available Icons

1. **Trophy** - Achievement & Excellence
2. **Star** - Premium & Excellence
3. **Check** - Success & Reliability
4. **Handshake** - Partnership & Trust
5. **Growth** - Progress & Expansion
6. **Clock** - Time & Longevity
7. **Shield** - Security & Protection
8. **Ribbon** - Milestone Achievement
9. **Lightning** - Energy & Power

## Usage Examples

### Basic Icon Usage

```jsx
import { YearsIcons } from '../components/ui/YearsIcons';

// Dark variant (default)
<YearsIcons.Trophy variant="dark" size={48} />

// Light variant
<YearsIcons.Star variant="light" size={64} />

// Different sizes
<YearsIcons.Check variant="dark" size={32} />
<YearsIcons.Check variant="dark" size={48} />
<YearsIcons.Check variant="dark" size={64} />
```

### Display Icon Grid

```jsx
import { YearsIconGrid } from '../components/ui/YearsIcons';

export default function ShowcasePage() {
  return <YearsIconGrid />;
}
```

### Integration in Sections

#### Dark Background Section
```jsx
<section style={{ backgroundColor: '#0F2557' }}>
  <YearsIcons.Trophy variant="light" size={56} />
  <h2>15 Years of Excellence</h2>
</section>
```

#### Light Background Section
```jsx
<section style={{ backgroundColor: '#FFFFFF' }}>
  <YearsIcons.Growth variant="dark" size={56} />
  <h2>Growing Strong</h2>
</section>
```

### With Custom Styling

```jsx
<div style={{ 
  padding: '24px', 
  textAlign: 'center',
  border: '1px solid #DAB228'
}}>
  <YearsIcons.Star variant="dark" size={48} />
  <p>Premium Quality Since 2010</p>
</div>
```

## CSS Classes (Optional)

If using the CSS file (`years-icons.css`), you can apply additional styling:

```jsx
<div className="years-icon dark lg pulse">
  <YearsIcons.Trophy variant="dark" size={64} />
</div>

<div className="years-icon dark md glow">
  <YearsIcons.Star variant="dark" size={48} />
</div>

<div className="years-icon light lg bounce">
  <YearsIcons.Growth variant="light" size={64} />
</div>
```

### Available CSS Classes

- **Sizes:** `sm` (32px), `md` (48px), `lg` (64px), `xl` (80px)
- **Variants:** `dark`, `light`
- **Animations:** `pulse`, `glow`, `bounce`

## Component Props

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `variant` | string | `'dark'` | `'dark'`, `'light'` |
| `size` | number | `48` | `32`, `40`, `48`, `56`, `64`, `80` |

## Integration Points

### 1. Home Page Hero Section
```jsx
// Add alongside existing 15-year badge
<div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
  <YearsIcons.Trophy variant="light" size={48} />
  <YearsIcons.Star variant="light" size={48} />
  <YearsIcons.Check variant="light" size={48} />
</div>
```

### 2. Features Section
```jsx
const features = [
  { icon: YearsIcons.Shield, title: 'Reliable', desc: '15 years proven' },
  { icon: YearsIcons.Growth, title: 'Growing', desc: 'Expanding globally' },
  { icon: YearsIcons.Handshake, title: 'Trusted', desc: 'By 500+ clients' }
];

{features.map(({ icon: Icon, title, desc }) => (
  <div key={title}>
    <Icon variant="dark" size={48} />
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
))}
```

### 3. About/Why Page
```jsx
<section>
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <YearsIcons.Clock variant="dark" size={64} />
    <h2>15 Years of Excellence</h2>
  </div>
</section>
```

### 4. Trust/Social Proof Section
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
  <div><YearsIcons.Trophy variant="dark" size={56} /><p>Industry Leaders</p></div>
  <div><YearsIcons.Star variant="dark" size={56} /><p>Top Rated</p></div>
  <div><YearsIcons.Shield variant="dark" size={56} /><p>Trusted</p></div>
</div>
```

## Best Practices

1. **Variant Matching**
   - Use `dark` variant on light backgrounds
   - Use `light` variant on dark backgrounds

2. **Size Selection**
   - Small icons (32-40px): Inline, badges
   - Medium icons (48-56px): Feature highlights
   - Large icons (64-80px): Hero sections, focal points

3. **Spacing**
   - Icon grid: 16-20px gap
   - Icon to text: 12px gap

4. **Animation**
   - Use `pulse` for attention-grabbing
   - Use `glow` for premium feel
   - Use `bounce` for playful interaction

5. **Accessibility**
   - Always pair icons with descriptive text
   - Use `aria-label` when icons are standalone

## Color Customization

To create custom color variants, duplicate the icon component and modify the color variables:

```jsx
export const CustomYearsIcon = ({ variant = 'dark', size = 48 }) => {
  const bgColor = variant === 'dark' ? '#YourColor' : '#YourColor';
  const strokeColor = variant === 'dark' ? '#YourAccent' : '#YourAccent';
  
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {/* SVG content */}
    </svg>
  );
};
```

## Example Page

See `YearsIconGrid` component for a full demonstration with all icons in both variants and color reference.
