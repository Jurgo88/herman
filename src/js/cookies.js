const STORAGE_KEY = "cookiesConsentState";
const CONSENT_ACCEPTED = "accepted";
const CONSENT_REJECTED = "rejected";
let clarityLoaded = false;
let activePopupElement = null;
let activeRejectText = "Odmietnuť";

const defaultOptions = {
  message: "Táto stránka používa cookies.",
  dismiss: "OK",
  linkText: "Viac info",
  rejectText: "Odmietnuť",
  clarityId: "",
};

const createPopup = (options) => {
  const wrapper = document.createElement("div");
  wrapper.className = "cookies-popup";
  wrapper.id = "cookiesPopup";

  const message = document.createElement("span");
  message.innerHTML = `${options.message} <a href="#" class="cookies-info-link">${options.linkText}</a>`;
  wrapper.appendChild(message);

  const button = document.createElement("button");
  button.id = "acceptCookies";
  button.type = "button";
  button.textContent = options.dismiss;

  const actions = document.createElement("div");
  actions.className = "cookies-actions";
  actions.append(button);
  wrapper.appendChild(actions);

  const infoLink = message.querySelector(".cookies-info-link");

  return { wrapper, button, infoLink };
};

export function initCookieConsent(customOptions = {}) {
  if (typeof document === "undefined") {
    return;
  }

  const options = { ...defaultOptions, ...customOptions };
  activeRejectText = options.rejectText || defaultOptions.rejectText;
  const storedState = localStorage.getItem(STORAGE_KEY);

  if (storedState === CONSENT_ACCEPTED) {
    loadClarityScript(options.clarityId);
    return;
  }

  if (storedState === CONSENT_REJECTED) {
    return;
  }

  const { wrapper, button, infoLink } = createPopup(options);
  activePopupElement = wrapper;
  document.body.appendChild(wrapper);

  button.addEventListener("click", () => {
    acceptCookies(wrapper, options);
  });

  if (infoLink) {
    infoLink.addEventListener("click", (event) => {
      event.preventDefault();
      showCookieModal();
    });
  }
}

export default initCookieConsent;

const scriptElement = document.currentScript;
const moduleOptions = scriptElement?.dataset
  ? {
      clarityId: scriptElement.dataset.clarityId || "",
    }
  : {};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initCookieConsent(moduleOptions));
} else {
  initCookieConsent(moduleOptions);
}

let modalElement;

function loadClarityScript(clarityId) {
  if (clarityLoaded) {
    return;
  }

  if (!clarityId) {
    console.warn("Microsoft Clarity ID is not provided. Skipping script injection.");
    return;
  }

  clarityLoaded = true;
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", clarityId, "", "");
}

function acceptCookies(wrapper, options) {
  localStorage.setItem(STORAGE_KEY, CONSENT_ACCEPTED);
  wrapper.style.display = "none";
  activePopupElement = null;
  loadClarityScript(options.clarityId);
}

function rejectCookies(wrapper) {
  const popupToHide = wrapper || activePopupElement;
  localStorage.setItem(STORAGE_KEY, CONSENT_REJECTED);
  if (popupToHide) {
    popupToHide.style.display = "none";
  }
  activePopupElement = null;
  hideCookieModal();
}

function ensureModal() {
  if (!modalElement) {
    modalElement = buildCookieModal();
  }
  return modalElement;
}

function buildCookieModal() {
  const overlay = document.createElement("div");
  overlay.className = "cookies-modal";
  overlay.innerHTML = `
    <div class="cookies-modal-content" role="dialog" aria-modal="true" aria-labelledby="cookiesModalTitle">
      <button type="button" class="cookies-modal-close" aria-label="Zavrieť">×</button>
      <p class="eyebrow">Microsoft Clarity</p>
      <h2 id="cookiesModalTitle">Sledovanie bez profilu</h2>
      <p>Pri analýze návštev používame výhradne Microsoft Clarity. Zberáme iba anonymizované signály, aby sme lepšie pochopili, čo na stránke funguje.</p>
      <div class="cookies-modal-body">
        <div>
          <strong>Heatmapy a replay</strong>
          <p>Vidíme, kde sa kliká a kde návštevníkov zastaví cesta, ale nič nespojíme s menom, emailom ani číslom.</p>
        </div>
        <div>
          <strong>Výkon a chyby</strong>
          <p>Clarity pomáha nájsť problematické sekcie, zlepšujeme výkon a minimalizujeme mŕtve odkazy.</p>
        </div>
      </div>
      <div class="cookies-modal-table">
        <div>
          <strong>CLID, MSCC, CLUT</strong>
          <p>Anonymne identifikujú reláciu pre heatmapy a záznamy návštev (platnosť ~365 dní).</p>
        </div>
        <div>
          <strong>CLSecure</strong>
          <p>Zabezpečuje, že údaje vychádzajú iba z overeného prehliadača (kratkodobo).</p>
        </div>
      </div>
      <div class="cookies-modal-actions">
        <button type="button" class="cookies-modal-reject">${activeRejectText}</button>
      </div>
      <p class="cookies-modal-footer">Vypnutím cookies v prehliadači zastavíte analýzu, stránka zostáva funkčná. Viac: <a href="https://clarity.microsoft.com/privacy" target="_blank" rel="noreferrer">clarity.microsoft.com/privacy</a></p>
    </div>
  `;

  document.body.appendChild(overlay);
  
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      hideCookieModal();
    }
  });

  const closeButton = overlay.querySelector(".cookies-modal-close");
  closeButton?.addEventListener("click", hideCookieModal);

  const rejectButton = overlay.querySelector(".cookies-modal-reject");
  rejectButton?.addEventListener("click", () => rejectCookies());

  return overlay;
}

function showCookieModal() {
  const modal = ensureModal();
  if (!modal) {
    return;
  }
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function hideCookieModal() {
  if (!modalElement) {
    return;
  }
  modalElement.classList.remove("is-open");
  document.body.style.overflow = "";
}
