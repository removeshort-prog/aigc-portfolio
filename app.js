const data = window.PORTFOLIO_DATA;
const generatedGallery = window.GENERATED_GALLERY || {};
const generatedRebuilds = window.GENERATED_REBUILDS || [];

const qs = (selector) => document.querySelector(selector);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function asEntry(input) {
  if (!input) return null;
  if (typeof input === "string") {
    return { src: input, width: 1, height: 1, orientation: "landscape" };
  }
  return input;
}

function imageFrame(input, fallback, className = "media-frame") {
  const entry = asEntry(input);
  const frame = el("div", className);
  if (!entry?.src) {
    frame.appendChild(el("div", "placeholder", fallback || "Image Pending"));
    return frame;
  }

  const img = new Image();
  img.src = entry.src;
  img.alt = fallback || "";
  img.loading = "lazy";
  img.addEventListener("error", () => {
    img.remove();
    frame.appendChild(el("div", "placeholder", fallback || "Image Pending"));
  });
  frame.appendChild(img);
  return frame;
}

function setNaturalRatio(button, entry) {
  if (entry?.width && entry?.height) {
    button.style.setProperty("--image-ratio", String(entry.width / entry.height));
    return;
  }
  const img = button.querySelector("img");
  if (!img) return;
  img.addEventListener("load", () => {
    if (img.naturalWidth && img.naturalHeight) {
      button.style.setProperty("--image-ratio", String(img.naturalWidth / img.naturalHeight));
    }
  });
}

function renderTags(tags = []) {
  const row = el("div", "tag-row");
  tags.forEach((tag) => row.appendChild(el("span", "tag", tag)));
  return row;
}

function initProfile() {
  qs("#profileName").textContent = data.profile.name;
  qs("#profileTarget").textContent = data.profile.target;
  qs("#profileSummary").textContent = data.profile.summary;

  const socialLinks = qs("#socialLinks");
  data.socialLinks.forEach((item) => {
    const card = document.createElement("a");
    card.className = `social-card is-${item.kind || "default"}`;
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noreferrer";
    const top = el("div", "social-card-top");
    top.appendChild(el("span", "", item.platform));
    top.appendChild(el("strong", "", item.value));
    card.appendChild(top);
    card.appendChild(el("p", "", item.label));
    card.appendChild(el("small", "", item.note));
    socialLinks.appendChild(card);
  });
}

function normalizeGeneratedGroup(groupId) {
  const generated = generatedGallery[groupId];
  if (Array.isArray(generated)) {
    return { cover: null, samples: generated.map(asEntry).filter(Boolean) };
  }
  return {
    cover: asEntry(generated?.cover),
    samples: (generated?.samples || []).map(asEntry).filter(Boolean),
  };
}

function renderDirectGallery() {
  const stack = qs("#directGallery");
  data.directGroups.forEach((group) => {
    const generated = normalizeGeneratedGroup(group.id);
    const manualSamples = (group.samples || []).map(asEntry).filter(Boolean);
    const samples = [...manualSamples, ...generated.samples];
    const cover = generated.cover || asEntry(group.cover) || samples[0];

    const section = el("article", "showcase-section");

    const coverButton = el("button", "showcase-cover");
    coverButton.type = "button";
    coverButton.appendChild(imageFrame(cover, group.fallback, "cover-frame"));
    coverButton.disabled = !cover?.src;
    if (cover?.src) {
      coverButton.addEventListener("click", () => openImage(cover, group.title, group.summary, group.tags));
    }
    section.appendChild(coverButton);

    const body = el("div", "showcase-body");
    const header = el("div", "showcase-head");
    const copy = el("div");
    copy.appendChild(renderTags(group.tags));
    copy.appendChild(el("h3", "", group.title));
    copy.appendChild(el("p", "work-level", group.difficulty));
    copy.appendChild(el("p", "showcase-summary", group.summary));
    header.appendChild(copy);

    const stat = el("div", "showcase-stat");
    stat.appendChild(el("strong", "", String(samples.length)));
    stat.appendChild(el("span", "", "直出样本"));
    header.appendChild(stat);
    body.appendChild(header);

    const judge = el("div", "judge-list");
    (group.judgePoints || []).forEach((point) => judge.appendChild(el("span", "", point)));
    body.appendChild(judge);

    const expand = el("button", "showcase-expand");
    expand.type = "button";
    expand.setAttribute("aria-expanded", "false");
    expand.innerHTML = `<span>展开样本</span><strong>&rarr;</strong>`;
    body.appendChild(expand);

    const drawer = el("div", "showcase-drawer");
    const collapse = el("button", "drawer-collapse", "收起");
    collapse.type = "button";
    drawer.appendChild(collapse);
    const scroller = el("div", "showcase-scroll");
    const track = el("div", "showcase-track");
    const galleryEntries = cover?.src ? [cover, ...samples] : samples;
    galleryEntries.forEach((entry, index) => {
      const thumb = el("button", `showcase-thumb is-${entry.orientation}`);
      thumb.type = "button";
      const ratio = entry.width && entry.height ? entry.width / entry.height : 1;
      thumb.style.setProperty("--image-ratio", String(ratio));
      thumb.appendChild(imageFrame(entry, `${group.title} 样本 ${index + 1}`, "thumb-frame"));
      thumb.addEventListener("click", () => openImage(entry, `${group.title} #${index + 1}`, group.summary, group.tags));
      track.appendChild(thumb);
    });
    if (!galleryEntries.length) {
      track.appendChild(el("div", "empty-gallery", "把图片放进对应文件夹后运行生成脚本，这里会显示样本。"));
    }
    scroller.appendChild(track);
    drawer.appendChild(scroller);

    section.appendChild(body);
    section.appendChild(drawer);

    const setExpanded = (expanded) => {
      section.classList.toggle("is-expanded", expanded);
      expand.setAttribute("aria-expanded", String(expanded));
      expand.innerHTML = expanded ? `<span>收起样本</span><strong>&uarr;</strong>` : `<span>展开样本</span><strong>&rarr;</strong>`;
      if (expanded) scroller.scrollTo({ left: 0, behavior: "smooth" });
    };

    expand.addEventListener("click", () => {
      setExpanded(!section.classList.contains("is-expanded"));
    });
    collapse.addEventListener("click", () => setExpanded(false));

    stack.appendChild(section);
  });
}

function openImage(input, title, summary, tags = []) {
  const dialog = qs("#workDialog");
  const body = qs("#dialogBody");
  body.innerHTML = "";
  body.appendChild(imageFrame(input, title, "dialog-media"));
  const content = el("div", "dialog-content");
  content.appendChild(renderTags(tags));
  content.appendChild(el("h2", "", title));
  content.appendChild(el("p", "body-text", summary));
  body.appendChild(content);
  dialog.showModal();
}

function renderRebuilds() {
  const grid = qs("#rebuildGrid");
  const rebuildItems = generatedRebuilds.length ? generatedRebuilds : data.rebuilds;
  rebuildItems.forEach((item, caseIndex) => {
    const beforeEntry = asEntry(item.before);
    const afterEntry = asEntry(item.after);
    const card = el("article", "rebuild-section");

    const beforeButton = el("button", "rebuild-before");
    beforeButton.type = "button";
    beforeButton.appendChild(imageFrame(beforeEntry, item.beforeFallback, "cover-frame"));
    beforeButton.appendChild(el("span", "compare-label", "Before"));
    beforeButton.addEventListener("click", () => openImage(beforeEntry, `${item.title} Before`, item.summary, item.tags));
    card.appendChild(beforeButton);

    const body = el("div", "rebuild-body");
    const header = el("div", "showcase-head");
    const copy = el("div");
    copy.appendChild(renderTags(item.tags));
    copy.appendChild(el("h3", "", item.title));
    copy.appendChild(el("p", "work-level", `案例 ${caseIndex + 1}`));
    copy.appendChild(el("p", "showcase-summary", item.summary));
    header.appendChild(copy);
    body.appendChild(header);

    const expand = el("button", "showcase-expand");
    expand.type = "button";
    expand.setAttribute("aria-expanded", "false");
    expand.innerHTML = `<span>查看重构后</span><strong>&rarr;</strong>`;
    body.appendChild(expand);

    const drawer = el("div", "rebuild-drawer");
    const collapse = el("button", "drawer-collapse", "收起");
    collapse.type = "button";
    drawer.appendChild(collapse);
    const scroller = el("div", "showcase-scroll");
    const track = el("div", "showcase-track");

    [
      { label: "Before", entry: beforeEntry },
      { label: "After", entry: afterEntry },
    ].forEach(({ label, entry }) => {
      const thumb = el("button", "showcase-thumb");
      thumb.type = "button";
      thumb.appendChild(imageFrame(entry, `${item.title} ${label}`, "thumb-frame"));
      thumb.appendChild(el("span", "compare-label", label));
      setNaturalRatio(thumb, entry);
      thumb.addEventListener("click", () => openImage(entry, `${item.title} ${label}`, item.summary, item.tags));
      track.appendChild(thumb);
    });

    scroller.appendChild(track);
    drawer.appendChild(scroller);
    card.appendChild(body);
    card.appendChild(drawer);

    const setExpanded = (expanded) => {
      card.classList.toggle("is-expanded", expanded);
      expand.setAttribute("aria-expanded", String(expanded));
      expand.innerHTML = expanded ? `<span>收起对比</span><strong>&uarr;</strong>` : `<span>查看重构后</span><strong>&rarr;</strong>`;
      if (expanded) scroller.scrollTo({ left: 0, behavior: "smooth" });
    };

    expand.addEventListener("click", () => setExpanded(!card.classList.contains("is-expanded")));
    collapse.addEventListener("click", () => setExpanded(false));
    grid.appendChild(card);
  });
}

function renderTools() {
  const grid = qs("#toolGrid");
  data.tools.forEach((tool) => {
    const card = tool.url ? document.createElement("a") : el("article");
    card.className = "tool-card";
    if (tool.url) {
      card.href = tool.url;
      card.target = "_blank";
      card.rel = "noreferrer";
    }
    const body = el("div", "card-body");
    const head = el("div", "tool-head");
    head.appendChild(el("span", "", tool.url ? "Open" : "Local"));
    body.appendChild(head);
    body.appendChild(el("h3", "", tool.title));
    body.appendChild(el("p", "", tool.summary));
    body.appendChild(renderTags(tool.tags));
    card.appendChild(body);
    grid.appendChild(card);
  });
}

qs("#dialogClose").addEventListener("click", () => qs("#workDialog").close());
qs("#workDialog").addEventListener("click", (event) => {
  if (event.target.id === "workDialog") event.currentTarget.close();
});

initProfile();
renderDirectGallery();
renderRebuilds();
renderTools();
