const HELP_MARKDOWN = `\`\`\`
  ===================================================

   ad88888ba             88                     88  
  d8"     "8b            88                     88  
  Y8,                    88                     88  
  \`Y8aaaaa,   ,adPPYYba, 88 ,adPPYYba,  ,adPPYb,88  
    \`"""""8b, ""     \`Y8 88 ""     \`Y8 a8"    \`Y88  
          \`8b ,adPPPPP88 88 ,adPPPPP88 8b       88  
  Y8a     a8P 88,    ,88 88 88,    ,88 "8a,   ,d88  
   "Y88888P"  \`"8bbdP"Y8 88 \`"8bbdP"Y8  \`"8bbdP"Y8
  ===================================================
\`\`\`

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
