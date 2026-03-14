/**
 * 配置数据 - 来源于你的指令库
 */

// 1. 场景限定句 (纯粹的环境/时间描述)
const sceneSentence = [
    "请在两分钟内", "请在对局内", "在开局一分钟内", "请在开局三分钟内", "牵制监管时必须",
    "请在辅助队友时",  "请在五分钟内", "请在三十分钟内", "在修机时",
    "请在队友上椅时", "用你最顺手的方式", "在监管面前", "请在板区里",
    "在两分钟内务必", "请在一分钟之内",
    "请在牵制优势区域内里", "在牵制监管的过程中", 
];

// 2. 核心行为句 (动宾结构，通用性强)
const actionSentence = [
    "修完一台机子","修完两台机子","修完地图中间隔最远的两台机子",
    "至少砸晕监管一次","完成所选角色最长的动作","牵制监管一整局","牵制直至其投降",
    "立刻救人","直接掏","选择压满救",
    "转移监管目标","为队友承伤"
     "把左手和右手的按键互换使用（电脑端请修改移动和交互按键）",
     "无视队友发的所有信息"
];

// 3. 补充要求句 (后缀，增加难度或仪式感)
const supplementSentence = [
    "选择棕色头发的为优",
     "优先选择黑色头发的",
    "做这件事时无需有任何犹豫", 
    "直到完整完成这件事再停止", "整个过程不能被任何路人发现"
    "全程保持沉默一句话也不说", 
    "做这件事时要放着哈基米音乐", 
];

// 4. 彩蛋库 (收纳逻辑强耦合、自带因果、或完整的一句话)
const easterEggs = [
    "在有路人的对局用小女孩并在开局一分钟完成附身",
    "玩前锋并且只能摸箱",
    "选择勘探并至少解擦一次"
    "选择玩具商并且放置的板车全部撞墙"，
    "玩OB位但只修机",
    "让入殓师带着两个棺材飞天",
    "使用佣兵并在救人时被打两个震慑，如果压好机需被打三个震慑",
];

// 乱码库：使用全角/宽字符减少抖动感
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWSYZ0123456789$#@&*%?±!<>-_\\/[]{}—=+^abcdefghijklmnopqrstuvwsyz"; 
const displayElement = document.getElementById('display-container');
const btn = document.getElementById('trigger-btn');
let isRunning = false;

/**
 * 核心动画函数：乱码逐字锁定
 */
function startScrambleAnimation(targetText) {
    let iteration = 0;
    let frame = 0;
    const stepSpeed = 5; // 稍微加快速度

    function update() {
        let output = "";
        let isAllComplete = true;

        for (let i = 0; i < targetText.length; i++) {
            if (i < Math.floor(iteration)) {
                output += targetText[i];
            } else {
                // 随机乱码
                const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                output += randomChar;
                isAllComplete = false;
            }
        }

        displayElement.innerText = output;

        if (!isAllComplete) {
            if (frame % stepSpeed === 0) {
                // 长句子自动加速锁定
                iteration += targetText.length > 20 ? 1 : 0.6; 
            }
            frame++;
            requestAnimationFrame(update);
        } else {
            isRunning = false;
        }
    }
    update();
}

/**
 * 按钮点击事件
 */
btn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;

    let finalSentence = "";

    // 10% 概率触发彩蛋库中的完整逻辑句
    if (Math.random() < 0.15) {
        finalSentence = `致：${easterEggs[Math.floor(Math.random() * easterEggs.length)]}`;
    } else {
        // 90% 概率三段式拼装
        const scene = sceneSentence[Math.floor(Math.random() * sceneSentence.length)];
        const action = actionSentence[Math.floor(Math.random() * actionSentence.length)];
        const supplement = supplementSentence[Math.floor(Math.random() * supplementSentence.length)];
        finalSentence = `致：${scene}${action}${supplement}`;
    }

    startScrambleAnimation(finalSentence);
});