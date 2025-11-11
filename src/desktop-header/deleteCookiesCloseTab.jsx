import { useEffect } from "react";

function UseDeleteCookiesOnTabClose(cookieNames = []) {
  useEffect(() => {
    let hiddenAt = 0;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now();
        console.log("hiddenAt: ", hiddenAt);
        console.log("inside visibilitychange event: ", hiddenAt);
      }
    };

    const handlePageHide = () => {
      const hiddenDuration = Date.now() - hiddenAt;

      // Heuristic: very short hidden time → likely tab/browser close
      if (hiddenDuration < 1000) {
        console.log("inside pagehide event")
        // cookieNames.forEach((name) => {
        //   // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        //   console.log(name)
        // });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [cookieNames]);

  return null; // no UI
}

export default UseDeleteCookiesOnTabClose;