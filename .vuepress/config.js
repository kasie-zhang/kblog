const secret = require('./secret');
module.exports = {
    "title": "KBlog",
    "description": "Loading, it won't be too long !",
    "dest": "dist",
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "/img/personal/photo.jpg"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ],
    ],
    "locales": {
        "/": {
            "lang": 'zh-CN'
        }
    },
    markdown: {                                 // 代码块中显示行号
        lineNumbers: true,
        anchor: {
            permalink: true
        },
        toc: {
            includeLevel: [1, 2, 3]
        },
        extendMarkdown: md => {
            // 使用更多的 markdown-it 插件!
            md.use(require('markdown-it-abbr')),
                md.use(require('markdown-it-sub')),
                md.use(require('markdown-it-sup')),
                md.use(require('markdown-it-mark')),
                md.use(require('markdown-it-kbd')),
                md.use(require('markdown-it-underline')),
                md.use(require('markdown-it-footnote'))
        }
    },
    plugins: [
        // 'vuepress-plugin-code-copy',
        'reading-progress',
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: " Copy",
            tip: {
                content: "Copy Success"
            }
        }],
        '@vuepress/plugin-nprogress',
        [
            '@vuepress/google-analytics',
            {
                'ga': secret.ga
            }
        ],
        // [
        //     "@vuepress-yard/vuepress-plugin-window",
        //     {
        //         title: "公告",
        //         windowStyle: {
        //             right: '20px', top: '70px', width: '260px', color: '#36648B'
        //         },
        //         contentInfo: {
        //             title: "欢迎关注微信公众号，不定时分享资源！🎉🎉🎉",
        //             needImg: true,
        //             imgUrl: "/img/personal/kasie-tool.jpg",
        //         },
        //         bottomInfo: {
        //             btnText: '主站',
        //             linkTo: 'https://zk123.top/'
        //         },
        //         closeOnce: true
        //     }
        // ],
        [
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: {
                    message: "发现新内容可用",
                    buttonText: "刷新"
                }
            }
        ],
        [
            '@vuepress-reco/vuepress-plugin-bgm-player',
            {
                audios: [
                    {
                        name: '晴天',
                        artist: '周杰伦',
                        url: '/music/m_1.mp3',
                        cover: '/music/p_1.jpg'
                    },
                    {
                        name: '夏恋',
                        artist: 'Otokaze',
                        url: '/music/m_2.mp3',
                        cover: '/music/p_2.png'
                    },
                    {
                        name: 'Melody_Fall',
                        artist: '春风是你亲启的信',
                        url: '/music/m_3.mp3',
                        cover: '/music/p_3.png'
                    },
                    {
                        name: '光辉岁月',
                        artist: 'Beyond',
                        url: '/music/m_4.mp3',
                        cover: '/music/p_4.jpg'
                    },
                    {
                        name: '灰色轨迹',
                        artist: 'Beyond',
                        url: '/music/m_5.flac',
                        cover: '/music/p_5.jpg'
                    },
                    {
                        name: '谁伴我闯荡',
                        artist: 'Beyond',
                        url: '/music/m_6.flac',
                        cover: '/music/p_6.jpg'
                    },
                    {
                        name: '情人',
                        artist: 'Beyond',
                        url: '/music/m_7.mp3',
                        cover: '/music/p_7.jpg'
                    },
                    {
                        name: '海阔天空',
                        artist: 'Beyond',
                        url: '/music/m_8.mp3',
                        cover: '/music/p_8.jpg'
                    },
                    {
                        name: '真的爱你',
                        artist: 'Beyond',
                        url: '/music/m_9.flac',
                        cover: '/music/p_9.jpg'
                    },
                    {
                        name: '喜欢你',
                        artist: 'Beyond',
                        url: '/music/m_10.flac',
                        cover: '/music/p_10.jpg'
                    },
                    {
                        name: '冷雨夜',
                        artist: 'Beyond',
                        url: '/music/m_11.flac',
                        cover: '/music/p_11.jpg'
                    },
                    {
                        name: 'Last Dance',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_12.flac',
                        cover: '/music/p_12.jpg'
                    },
                    {
                        name: '世界第一等',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_13.mp3',
                        cover: '/music/p_13.jpg'
                    },
                    {
                        name: '东石（透南风Live）',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_14.mp3',
                        cover: '/music/p_14.jpg'
                    },
                    {
                        name: '再度重相逢',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_15.flac',
                        cover: '/music/p_15.jpg'
                    },
                    {
                        name: '挪威的森林',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_16.flac',
                        cover: '/music/p_16.jpg'
                    },
                    {
                        name: '梦醒时分',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_17.mp3',
                        cover: '/music/p_17.jpg'
                    },
                    {
                        name: '痛哭的人',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_18.mp3',
                        cover: '/music/p_18.jpg'
                    },
                    {
                        name: '突然的自我',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_19.flac',
                        cover: '/music/p_19.jpg'
                    },
                    {
                        name: '被动（Live）',
                        artist: '伍佰 & China Blue',
                        url: '/music/m_20.mp3',
                        cover: '/music/p_20.jpg'
                    },
                    {
                        name: '七里香',
                        artist: '周杰伦',
                        url: '/music/m_21.mp3',
                        cover: '/music/p_21.jpg'
                    },
                    {
                        name: '甜甜的',
                        artist: '周杰伦',
                        url: '/music/m_22.mp3',
                        cover: '/music/p_22.jpg'
                    },
                    {
                        name: '成都',
                        artist: '赵雷',
                        url: '/music/m_23.mp3',
                        cover: '/music/p_23.jpg'
                    },
                    {
                        name: '奉陪',
                        artist: '于文文',
                        url: '/music/m_24.mp3',
                        cover: '/music/p_24.jpg'
                    },
                    {
                        name: '打上花火',
                        artist: '米津玄師',
                        url: '/music/m_25.mp3',
                        cover: '/music/p_25.jpg'
                    },
                    {
                        name: 'Viva La Vida',
                        artist: 'Coldpaly',
                        url: '/music/m_26.mp3',
                        cover: '/music/p_26.jpg'
                    },
                    {
                        name: 'Yellow',
                        artist: 'Coldpaly',
                        url: '/music/m_27.mp3',
                        cover: '/music/p_27.jpg'
                    },
                    {
                        name: '后来',
                        artist: '刘若英',
                        url: '/music/m_28.mp3',
                        cover: '/music/p_28.jpg'
                    },
                    {
                        name: 'DEPAPEPE',
                        artist: '風見鶏',
                        url: '/music/m_29.mp3',
                        cover: '/music/p_29.jpg'
                    },
                    {
                        name:'A moment of peace',
                        artist: 'Painless Destiny',
                        url:'/music/m_30.flac',
                        cover:'/music/p_30.jpg'
                    },
                    {
                        name:'Sleepyhead',
                        artist: 'Galen Crew',
                        url:'/music/m_31.flac',
                        cover:'/music/p_31.jpg'
                    },
                    {
                        name:'Honey Take My Hand',
                        artist: 'Cody Francis',
                        url:'/music/m_32.mp3',
                        cover:'/music/p_32.jpg'
                    },
                    {
                        name:'月半小夜曲',
                        artist: '李克勤',
                        url:'/music/m_33.mp3',
                        cover:'/music/p_33.jpg'
                    },
                    {
                        name:'把悲伤留给自己',
                        artist: '秋野',
                        url:'/music/m_34.mp3',
                        cover:'/music/p_34.jpg'
                    },
                    {
                        name:'地球大合唱',
                        artist: '徐小凤',
                        url:'/music/m_35.mp3',
                        cover:'/music/p_35.jpg'
                    }
                ]
            }
        ],
    ],
    "themeConfig": {
        // 图标在 .vuepress/theme/styles/enhanceApp.js 中更改
        "nav": [
            {
                "text": "主页",
                "link": "/",
                "icon": "reco-home"
            },
            {
                "text": "时间轴",
                "link": "/timeline/",
                "icon": "reco-date"
            },
            {
                text: '留言板',
                link: '/article/home/suggestion/',
                icon: 'reco-suggestion'
            },
            {
                text: 'KNav',
                link: 'https://tool.zk123.top',
                icon: 'kasie-nav',
                target: '_blank'
            },
            {
                text: 'KDrive',
                link: 'https://drive.zk123.top',
                icon: 'kasie-drive',
                target: '_blank'
            },
            {
                text: 'KLink',
                link: '/article/collect/klink/',
                icon: 'kasie-link',
            },
            {
                "text": "关于",
                "link": "/about/",
                "icon": "reco-account"
            },
        ],
        "type": "blog",
        "sidebar": false,
        "blogConfig": {
            "category": {
                "location": 2,
                "text": "分类"
            },
            "tag": {
                "location": 3,
                "text": "标签"
            }
        },
        "friendLink": [
            {
                "title": "zealsay",
                "desc": "zealsay说你想说",
                "logo": "https://pan.zealsay.com/avatar/20200606105310570000000.jpg",
                "link": "https://blog.zealsay.com"
            },
            {
                title: 'Java 全栈知识体系',
                desc: '一位大牛的Blog，主要包括Java的学习路线',
                logo: 'https://www.pdai.tech/favicon.ico',
                link: 'https://www.pdai.tech/'
            },
            {
                title: 'Lucien\'s Blog',
                desc: 'PasteMe的作者',
                logo: '/img/personal/lucien.ico',
                link: 'https://blog.lucien.ink/'
            },
            {
                title: '廖雪峰',
                desc: '廖雪峰老师的网站',
                logo: 'https://www.liaoxuefeng.com/favicon.ico',
                link: 'https://www.liaoxuefeng.com/'
            },
            {
                title: '平凡的你我',
                desc: '平凡的小陈同学',
                logo: 'https://reinness.com/avatar.png',
                link: 'https://reinness.com/'
            },
            {
                title: '远方有你，伴余生',
                desc: '博客园的一位博主',
                logo: 'https://img.mp.itc.cn/upload/20160713/15c1f5a5d7374027b6821736cac5c9ee_th.jpg',
                link: 'https://www.cnblogs.com/glassysky/'
            },
            {
                title: '吴川斌的博客',
                desc: '分享编程资源和知识',
                logo: '/img/personal/mr-wu.ico',
                link: 'https://www.mr-wu.cn/'
            },
            {
                title: '三.钻 TriDiamond',
                desc: 'hoxo 暗黑主题',
                logo: 'https://obsidian.tridiamond.tech/img/favicon.png',
                link: 'https://obsidian.tridiamond.tech/'
            },
            {
                title: '小资源栈',
                desc: '分享编程书籍',
                logo: 'https://pymlovelyq.github.io/images/avatar.jpg',
                link: 'https://pymlovelyq.github.io/'
            },
            {
                title: '午后杂南',
                desc: 'reco_luan',
                logo: '/img/personal/recoluan.ico',
                link: 'https://www.recoluan.com/'
            }
        ],
        "displayAllHeaders": true,
        "subSidebar": 'auto',
        "searchMaxSuggestoins": 15,
        "authorAvatar": '/img/personal/photo.jpg',
        "valineConfig": {
            appId: secret.AppId,
            count: true,
            appKey: secret.AppKey,
            showComment: false,
            recordIP: true,
            visitor: true,
            avatar: 'hide',
            requiredFields: ['nick', 'mail'],       // 设置必填项
            emojiCDN: 'https://valinecdn.bili33.top/',
            placeholder: '📌昵称框输入QQ号自动获取必填信息\n🚀评论和回复支持Markdown格式\n📧你的留言若收到回复会有邮件通知\n🙋各位道友，请举手发言!',
            enableQQ: true,
            emojiMaps: {
                "QQ1": "QQ/aini.gif",
                "QQ2": "QQ/aixin.gif",
                "QQ3": "QQ/aoman.gif",
                "QQ4": "QQ/baiyan.gif",
                "QQ5": "QQ/bangbangtang.gif",
                "QQ6": "QQ/baojin.gif",
                "QQ7": "QQ/baoquan.gif",
                "QQ8": "QQ/bishi.gif",
                "QQ9": "QQ/bizui.gif",
                "QQ11": "QQ/cahan.gif",
                "QQ12": "QQ/caidao.gif",
                "QQ13": "QQ/chi.gif",
                "QQ14": "QQ/ciya.gif",
                "QQ15": "QQ/dabing.gif",
                "QQ16": "QQ/daku.gif",
                "QQ17": "QQ/dan.gif",
                "QQ18": "QQ/deyi.gif",
                "QQ19": "QQ/doge.gif",
                "QQ20": "QQ/fadai.gif",
                "QQ21": "QQ/fanu.gif",
                "QQ22": "QQ/fendou.gif",
                "QQ23": "QQ/ganga.gif",
                "QQ24": "QQ/gouyin.gif",
                "QQ25": "QQ/guzhang.gif",
                "QQ26": "QQ/haixiu.gif",
                "QQ27": "QQ/hanxiao.gif",
                "QQ28": "QQ/haobang.gif",
                "QQ29": "QQ/haqian.gif",
                "QQ30": "QQ/hecai.gif",
                "QQ31": "QQ/hexie.gif",
                "QQ32": "QQ/huaixiao.gif",
                "QQ33": "QQ/jie.gif",
                "QQ34": "QQ/jingkong.gif",
                "QQ35": "QQ/jingxi.gif",
                "QQ36": "QQ/jingya.gif",
                "QQ37": "QQ/juhua.gif",
                "QQ38": "QQ/keai.gif",
                "QQ39": "QQ/kelian.gif",
                "QQ40": "QQ/koubi.gif",
                "QQ41": "QQ/ku.gif",
                "QQ42": "QQ/kuaikule.gif",
                "QQ43": "QQ/kulou.gif",
                "QQ44": "QQ/kun.gif",
                "QQ45": "QQ/lanqiu.gif",
                "QQ46": "QQ/leiben.gif",
                "QQ47": "QQ/lenghan.gif",
                "QQ48": "QQ/liuhan.gif",
                "QQ49": "QQ/liulei.gif",
                "QQ50": "QQ/nanguo.gif",
                "QQ51": "QQ/OK.gif",
                "QQ52": "QQ/penxue.gif",
                "QQ53": "QQ/piezui.gif",
                "QQ54": "QQ/pijiu.gif",
                "QQ55": "QQ/qiang.gif",
                "QQ56": "QQ/qiaoda.gif",
                "QQ57": "QQ/qinqin.gif",
                "QQ58": "QQ/qiudale.gif",
                "QQ59": "QQ/quantou.gif",
                "QQ60": "QQ/saorao.gif",
                "QQ61": "QQ/se.gif",
                "QQ62": "QQ/shengli.gif",
                "QQ63": "QQ/shouqiang.gif",
                "QQ64": "QQ/shuai.gif",
                "QQ65": "QQ/shui.gif",
                "QQ66": "QQ/tiaopi.gif",
                "QQ67": "QQ/touxiao.gif",
                "QQ68": "QQ/tu.gif",
                "QQ69": "QQ/tuosai.gif",
                "QQ70": "QQ/weiqu.gif",
                "QQ71": "QQ/weixiao.gif",
                "QQ72": "QQ/woshou.gif",
                "QQ73": "QQ/wozuimei.gif",
                "QQ74": "QQ/wunai.gif",
                "QQ75": "QQ/xia.gif",
                "QQ76": "QQ/xiaojiujie.gif",
                "QQ77": "QQ/xiaoku.gif",
                "QQ78": "QQ/xiaoyanger.gif",
                "QQ79": "QQ/xieyanxiao.gif",
                "QQ80": "QQ/xigua.gif",
                "QQ81": "QQ/xu.gif",
                "QQ82": "QQ/yangtuo.gif",
                "QQ83": "QQ/yinxian.gif",
                "QQ84": "QQ/yiwen.gif",
                "QQ85": "QQ/youhengheng.gif",
                "QQ86": "QQ/youling.gif",
                "QQ87": "QQ/yun.gif",
                "QQ88": "QQ/zaijian.gif",
                "QQ89": "QQ/zhayanjian.gif",
                "QQ90": "QQ/zhemo.gif",
                "QQ91": "QQ/zhouma.gif",
                "QQ92": "QQ/zhuakuang.gif",
                "QQ93": "QQ/zuohengheng.gif"
            },
        },
        "logo": "/img/personal/photo.jpg",
        "smoothScroll": true,
        "search": true,
        "lastUpdated": "Last Updated",
        "author": "Kasie Zhang",
        "record": "浙ICP备19050647号 ", //icp备案
        "startYear": "2019",
        "info": "喜欢小仙女，喜欢一切美好的事物。",
        "socials": {
            "github": "https://github.com/kasie-zhang",
            "gitlub": false, //gitlub
            "gitee": "https://gitee.com/kasie-zhang",
            "jianshu": false, //简书
            "zhihu": "https://zhihu.com/people/kasie-zhang",
            "toutiao": false, //知乎
            "juejin": "https://juejin.cn/user/4020273580873928",
            "segmentfault": false, //思否
            "csdn": "https://blog.csdn.net/kasie_zhang",
            "wechat": false, //微信
            "qq": "/img/personal/qq.jpg" //QQ
        },
        "mottos": [{
            "zh": "愿你保持初心和善良,笑里尽是温暖与坦荡。",
            "en": "May you keep your original heart and kindness, and smile with warmth and magnanimity."
        },
            {
                "zh": "年轻就是无限的可能。",
                "en": "Youth means limitless possibilities."
            },
            {
                "zh": "每一个不曾起舞的日子，都是对生命的辜负。",
                "en": "We should consider every day lost on which we have not danced at least once."
            },
            {
                "zh": "不为模糊不清的未来担忧，只为清清楚楚的现在努力。",
                "en": "Don't worry about the vague future, just strive for the clear present."
            },
            {
                "zh": "与其装腔作势企图影响别人，不如咬牙切齿狠命修理自己。",
                "en": "Rather than pretending to influence others, it's better to grind your teeth and repair yourself."
            }, {
                "zh": "上天是公平的，只要努力就会有收获，否则就是你不够努力。",
                "en": "God is fair, as long as effort will include results, otherwise is you hard enough."
            },
            {
                "zh": "人生没有后悔，我们只能尽力去不让自己后悔。",
                "en": "Life without regret, we can only do our best to not to regret."
            }
        ],
        "covers": [
            '/img/personal/bg1.webp',
            '/img/personal/bg2.webp',
            '/img/personal/bg3.webp',
            '/img/personal/bg4.webp',
            '/img/personal/bg5.webp',
            '/img/personal/bg6.webp',
            '/img/personal/bg7.webp'
        ],
        "codeTheme": "tomorrow"
    },
}