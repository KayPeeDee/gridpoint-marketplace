export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function truncateChar(text: string): string {
  let charlimit = 100;
  if(!text || text.length <= charlimit ) {
    return text;
  }
  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let shortened = without_html.substring(0, charlimit) + "...";
  return without_html;
}
