/* =====================================================================
 * 通用脚本：把页面中的占位符替换为 config.js 中的配置值
 *   {{TA}}    → CONF.ta    （TA 的名字）
 *   {{SIGN}}  → CONF.sign  （落款署名）
 *   {{YEARS}} → CONF.years （纪念日周年数）
 *   {{REL}}   → 在一起 / 相识（由 CONF.mode 决定）
 *   {{ASK}}   → 嫁给我好吗 / 在一起好吗（第 5 页大字标题，由 CONF.mode 决定）
 *   {{ASK2}}  → 嫁给我好吗？/ 在一起好吗？（第 5 页正文，由 CONF.mode 决定）
 *   {{ASK3}}  → 嫁给我吧 / 在一起吧（第 5 页标题/浮动，由 CONF.mode 决定）
 * 由 config.js 引入后自动执行，无需手动调用。
 * ===================================================================== */
(function () {
    if (!window.CONF) return;
    var isDating = CONF.mode === 'dating';
    var map = {
        '{{TA}}': CONF.ta,
        '{{SIGN}}': CONF.sign,
        '{{YEARS}}': CONF.years || 5,
        '{{REL}}': isDating ? '相识' : '在一起',
        '{{ASK}}': isDating ? '在 一 起 好 吗' : '嫁 给 我 好 吗',
        '{{ASK2}}': isDating ? '在一起好吗？' : '嫁给我好吗？',
        '{{ASK3}}': isDating ? '在一起吧' : '嫁给我吧',
        '{{HUG}}': isDating ? '抱抱我的' + CONF.ta + '宝贝 🫂' : '抱抱我的新娘 🫂'
    };

    function replaceText(text) {
        var keys = Object.keys(map);
        for (var i = 0; i < keys.length; i++) {
            text = text.split(keys[i]).join(map[keys[i]]);
        }
        return text;
    }

    // 替换 body 内所有文本节点
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
            return node.nodeValue.indexOf('{{') !== -1
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT;
        }
    });
    var nodes = [], node;
    while ((node = walker.nextNode())) nodes.push(node);
    for (var j = 0; j < nodes.length; j++) {
        nodes[j].nodeValue = replaceText(nodes[j].nodeValue);
    }

    // 替换标题
    if (document.title.indexOf('{{') !== -1) {
        document.title = replaceText(document.title);
    }
})();
