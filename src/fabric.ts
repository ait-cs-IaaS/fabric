import RFB from "@novnc/novnc/core/rfb";

export class Fabric {
  private rfb: RFB | null = null;

  constructor(
    private selector: string,
    private target: string,
    private username: string | null,
    private password: string | null
  ) {
    console.log("[FABRIC] initialized");
    const el: Element | null = document.querySelector(this.selector);
    if (!el) {
      return;
    }

    const url: URL = new URL(
      "/upstream/" + target,
      window.location.protocol.replace("http", "ws") +
        "//" +
        window.location.host
    );
    this.rfb = new RFB(el, url.toString(), {
      credentials: {
        username: username ?? "",
        password: password ?? "",
      },
    });
    this.rfb.resizeSession = true;
    this.rfb.addEventListener("clipboard", this.clipboardReceive);

    const pasteButton: Node | null = document.getElementById(
      "noVNC_clipboard_text"
    );
    if (pasteButton) {
      pasteButton.addEventListener("click", (event: any) => {
        navigator.clipboard.readText().then((paste: string) => {
          console.log(`[FABRIC] clipboardData: "${paste}"`);
          this.clipboardToFabric(paste);
        });
      });
    }

    window.addEventListener("paste", (event: any) => {
      const paste = (
        event.clipboardData || (window as any).clipboardData
      ).getData("text");
      console.log(`[FABRIC] clipboardData: "${paste}"`);

      this.clipboardToFabric(paste);
      event.preventDefault();
    });
  }

  clipboardReceive(e: any) {
    const clip = document.getElementById(
      "noVNC_clipboard_text"
    ) as HTMLInputElement;
    clip.value = e.detail.text;
  }

  clipboardToFabric(text: string) {
    this.rfb?.clipboardPasteFrom(text);
  }
}
