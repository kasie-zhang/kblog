const http = require('http')
const createHandler = require('/usr/local/node-v14.17.0-linux-x64/lib/node_modules/github-webhook-handler')
// 全局安装 node 包后, 执行 npm link xxx, 来链接使用全局包
const handler = createHandler({ path: '/webhook-kblog', secret: 'kasie_zhang_webhook' })
const spawn = require('child_process').spawn;
const date = new Date();
const date_str = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

http.createServer((req, res) => {
    handler(req, res, function (err) {
        console.log('err', err);
        res.statusCode = 404
        res.end('404. No Such Location.')
    });
}).listen(3002, () => {
    console.log('running in http://127.0.0.1:3002/');
});

handler.on('error', function (err) {
    console.error('Error:', err.message)
});

handler.on('push', event => {
    try {
        console.log('Catching Webhook Request.');

        const { repository, ref } = event.payload;
        const { full_name, name, private, size } = repository;
        const digit_size = (size - '0') / 1024.0;
        // 推送到主分支则自动部署
        const autoRun = ref === 'refs/heads/master';
        console.info(`
            - 接收到仓库:【${full_name}】的推送消息；
            - 修改分支：${ref};
            - 仓库是否私有：${private};
            - 大小：${digit_size} MB;
            - 是否需要自动部署：${autoRun};
            - 执行时间：${date_str};
        `);

        // 判断是否需要自动部署
        if (!autoRun) {
            return
        }

        console.log('Start Excute Bash');
        const s = spawn('sh', ['./pull.sh']);
        s.stdout.on('data', (data) => {
            console.log(`${name}:${data}`);
        });
        s.stderr.on('data', (data) => {
            console.log(`${name}: ${data}`);
        });
    } catch (e) {
        console.log('Excute Failed !', e)
    }
});
