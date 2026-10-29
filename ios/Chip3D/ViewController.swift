import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKUIDelegate {
    var webView: WKWebView!

    override var prefersStatusBarHidden: Bool {
        return true
    }

    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        return .landscape
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 0.22, green: 0.74, blue: 0.97, alpha: 1.0)

        setupWebView()
        loadWebContent()
    }

    private func setupWebView() {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        config.defaultWebpagePreferences = prefs
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")

        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never

        view.addSubview(webView)
    }

    private func loadWebContent() {
        if let htmlPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "www") {
            let htmlUrl = URL(fileURLWithPath: htmlPath)
            let readAccessUrl = htmlUrl.deletingLastPathComponent()
            webView.loadFileURL(htmlUrl, allowingReadAccessTo: readAccessUrl)
        } else if let fallbackUrl = Bundle.main.url(forResource: "index", withExtension: "html") {
            let readAccessUrl = fallbackUrl.deletingLastPathComponent()
            webView.loadFileURL(fallbackUrl, allowingReadAccessTo: readAccessUrl)
        } else {
            print("❌ Không tìm thấy index.html trong Bundle!")
        }
    }
}
