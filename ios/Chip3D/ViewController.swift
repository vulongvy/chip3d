import UIKit
import WebKit
import AVFoundation

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

        // [MOBILE-FIX-6] WKWebView mac dinh bi iPhone tat tieng khi may de cong tac
        // im lang (silent switch) -> mat ca nhac nen lan giong doc du file am thanh
        // nam ngay trong app. Dat AVAudioSession sang .playback nhu moi game khac
        // de am thanh game phat binh thuong bat ke cong tac im lang.
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            print("Khong dat duoc AVAudioSession: \(error)")
        }

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
        // [MOBILE-FIX] Cho phép cuộn trang chủ/menu: trước đây khoá cứng khiến nội dung
        // dài hơn màn hình ngang bị cắt và người dùng kẹt ở khung hình đầu tiên.
        // Các chế độ 3D toàn màn hình tự khoá cuộn bằng CSS (overflow:hidden + 100dvh)
        // ở phía web nên không bị ảnh hưởng.
        webView.scrollView.isScrollEnabled = true
        webView.scrollView.bounces = true
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

    // MARK: - WKUIDelegate: JavaScript alert / confirm / prompt
    // [MOBILE-FIX] Trước đây class nhận WKUIDelegate nhưng không cài đặt các hàm này,
    // nên mọi alert()/confirm()/prompt() trong game (vd nút "Chơi Lại Từ Đầu" dùng
    // window.confirm) đều im lặng chết trên iOS.

    func webView(_ webView: WKWebView,
                 runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping () -> Void) {
        presentJSPanel(title: nil, message: message, buttons: [
            (title: "OK", style: .default, value: true)
        ]) { _ in completionHandler() }
    }

    func webView(_ webView: WKWebView,
                 runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (Bool) -> Void) {
        presentJSPanel(title: nil, message: message, buttons: [
            (title: "Huỷ", style: .cancel, value: false),
            (title: "Đồng ý", style: .default, value: true)
        ]) { completionHandler($0) }
    }

    func webView(_ webView: WKWebView,
                 runJavaScriptTextInputPanelWithPrompt prompt: String,
                 defaultText: String?,
                 initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (String?) -> Void) {
        guard isViewLoaded, view.window != nil, presentedViewController == nil else {
            completionHandler(nil)
            return
        }
        let alert = UIAlertController(title: nil, message: prompt, preferredStyle: .alert)
        alert.addTextField { textField in
            textField.text = defaultText
        }
        alert.addAction(UIAlertAction(title: "Huỷ", style: .cancel) { _ in
            completionHandler(nil)
        })
        alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in
            completionHandler(alert.textFields?.first?.text)
        })
        present(alert, animated: true)
    }

    private func presentJSPanel(title: String?,
                                message: String,
                                buttons: [(title: String, style: UIAlertAction.Style, value: Bool)],
                                completion: @escaping (Bool) -> Void) {
        guard isViewLoaded, view.window != nil, presentedViewController == nil else {
            completion(buttons.last?.value ?? false)
            return
        }
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        for button in buttons {
            alert.addAction(UIAlertAction(title: button.title, style: button.style) { _ in
                completion(button.value)
            })
        }
        present(alert, animated: true)
    }
}
