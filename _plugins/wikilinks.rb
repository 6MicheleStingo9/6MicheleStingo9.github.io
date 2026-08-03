# Renders Obsidian-style wikilinks so that notes can be copied from a vault
# into _posts/ or a collection like _notes/ without editing them.
#
#   [[Target]]         the target's own text becomes the link text
#   [[Target|label]]   "label" is shown instead
#
# A target is resolved against the titles and slugs of everything the site
# publishes. When it resolves, the wikilink becomes a real link. When it does
# not — because the note lives in the vault and was never published — the label
# is kept as plain text and the target is preserved as a tooltip, so the
# reference survives instead of silently disappearing.

require "cgi"

module WikiLinks
  PATTERN = /\[\[([^\]\|]+?)(?:\|([^\]]+?))?\]\]/

  # Titles and filename slugs both work as targets, so a note can be referenced
  # the way Obsidian does it (by filename) or by the title in its frontmatter.
  def self.build_index(site)
    index = {}
    (site.documents + site.pages).each do |doc|
      next if doc.url.nil? || doc.url.empty?
      title = doc.data["title"]
      # Documents expose basename_without_ext, pages only basename.
      raw = doc.respond_to?(:basename_without_ext) ? doc.basename_without_ext : doc.basename
      slug = raw.to_s.sub(/\A\d{4}-\d{2}-\d{2}-/, "")
      [title, slug].compact.each do |key|
        key = key.to_s.strip.downcase
        index[key] = doc.url unless key.empty?
      end
    end
    index
  end

  def self.render(content, index)
    content.gsub(PATTERN) do
      target = Regexp.last_match(1).strip
      label = (Regexp.last_match(2) || target).strip
      url = index[target.downcase]

      if url
        "[#{label}](#{url})"
      else
        %(<span class="wikilink-unresolved" title="#{CGI.escapeHTML(target)}">#{label}</span>)
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  site.config["wikilink_index"] = WikiLinks.build_index(site)
end

Jekyll::Hooks.register [:documents, :pages], :pre_render do |doc|
  next unless doc.content.is_a?(String) && doc.content.include?("[[")
  index = doc.site.config["wikilink_index"] || {}
  doc.content = WikiLinks.render(doc.content, index)
end
