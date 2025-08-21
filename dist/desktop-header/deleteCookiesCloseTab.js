import { useEffect } from "react";
function UseDeleteCookiesOnTabClose() {
  var cookieNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  useEffect(function () {
    var hiddenAt = 0;
    var handleVisibilityChange = function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now();
      }
    };
    var handlePageHide = function handlePageHide() {
      var hiddenDuration = Date.now() - hiddenAt;

      // Heuristic: very short hidden time → likely tab/browser close
      if (hiddenDuration < 100) {
        cookieNames.forEach(function (name) {
          document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    return function () {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [cookieNames]);
  return null; // no UI
}
export default UseDeleteCookiesOnTabClose;
//# sourceMappingURL=deleteCookiesCloseTab.js.map