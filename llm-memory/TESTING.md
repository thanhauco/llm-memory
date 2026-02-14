# Testing Guide - LLM Memory Site

## Quick Start Testing

### 1. Start Development Server
```bash
npm run dev
```

Then open: **http://localhost:3000**

### 2. Navigate to Types Page
- Click "Types" in the sidebar navigation
- Or go directly to: **http://localhost:3000/types**

## What to Test

### ✅ Short-term Memory Section
1. **Visual Check:**
   - See the enhanced card with characteristics box
   - Check the flow diagram is rendering
   - Verify code block shows syntax highlighting

2. **Content Check:**
   - Read through the key characteristics
   - Review the implementation code example
   - Check "When to Use" section

### ✅ Long-term/Episodic Memory Section
1. **Visual Check:**
   - See the episodic memory explanation box
   - Check the episodic memory flow diagram
   - Verify the comprehensive code example

2. **Content Check:**
   - Review episodic memory features
   - Check the implementation with multiple retrieval strategies
   - Verify use case guidance

### ✅ Semantic Memory Section
1. **Visual Check:**
   - See the enhanced semantic memory diagram
   - Check the comprehensive code example
   - Verify comparison boxes

2. **Content Check:**
   - Review semantic vs episodic comparison
   - Check the implementation with hybrid search
   - Verify use case guidance

### ✅ Memory Type Comparison Table
1. **Visual Check:**
   - Scroll to the comparison table
   - Verify table renders correctly
   - Check all columns are visible

2. **Content Check:**
   - Compare features across memory types
   - Review use cases for each type
   - Check the detailed use case guide below the table

### ✅ Search Functionality
1. **Test Search:**
   - Click the search icon in the sidebar
   - Try searching for:
     - "short-term memory"
     - "episodic memory"
     - "semantic memory"
     - "comparison"
   
2. **Verify Results:**
   - Check that new search entries appear
   - Click on results to navigate
   - Verify search closes after selection

### ✅ Dark Mode
1. **Toggle Theme:**
   - Click the theme toggle button (bottom of sidebar)
   - Verify all content adapts to dark mode
   - Check code blocks change theme
   - Verify diagrams remain visible

### ✅ Responsive Design
1. **Mobile View:**
   - Resize browser window or use dev tools
   - Check mobile menu appears
   - Verify content is readable on small screens
   - Test navigation on mobile

### ✅ Navigation
1. **Test Links:**
   - Click "Back to Concepts" button
   - Click "Learn Implementations" button
   - Verify smooth navigation
   - Check URLs are correct

## Common Issues & Solutions

### Issue: Diagrams Not Rendering
**Solution:** 
- Check browser console for errors
- Verify Mermaid.js is loaded
- Refresh the page

### Issue: Code Blocks Not Highlighting
**Solution:**
- Check if theme is set correctly
- Verify syntax highlighter is loaded
- Check browser console for errors

### Issue: Search Not Working
**Solution:**
- Check browser console
- Verify SearchDialog component is loaded
- Try refreshing the page

### Issue: Dark Mode Not Working
**Solution:**
- Check if next-themes is installed
- Verify ThemeProvider is in layout
- Check browser console for errors

## Testing Checklist

- [ ] Page loads without errors
- [ ] All sections are visible
- [ ] Diagrams render correctly
- [ ] Code blocks have syntax highlighting
- [ ] Comparison table displays properly
- [ ] Search finds new content
- [ ] Dark mode works
- [ ] Mobile navigation works
- [ ] All links work
- [ ] Content is readable and well-formatted

## Browser Console Testing

Open browser DevTools (F12) and check:
- No red errors in console
- No warnings about missing components
- Network tab shows all assets loading

## Performance Testing

1. **Page Load:**
   - Check page loads quickly
   - Verify no long loading times
   - Check Network tab for asset sizes

2. **Interactions:**
   - Search should be responsive
   - Theme toggle should be instant
   - Navigation should be smooth

## Next Steps After Testing

If everything works:
- ✅ New features are ready!
- Consider adding more examples
- Consider adding interactive demos

If issues found:
- Check browser console for errors
- Verify all dependencies are installed
- Check file paths and imports

