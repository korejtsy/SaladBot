const HELP_MARKDOWN = `
  I can help you order food from salad.com.ua!
  
  You can control me by sending these commands:
  
  */help* - Show help info
  */cart* - Current state of cart
  */add* - Add item to cart
  */reset* - Clear current cart
  */order* - Submit order
  */user* - Adds user
  */settings* - Edit chat/personal settings like street, house number, et
`;

module.exports = (ctx) => {
  ctx.replyWithMarkdown(HELP_MARKDOWN);
};
