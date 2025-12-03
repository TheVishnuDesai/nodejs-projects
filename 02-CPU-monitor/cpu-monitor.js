import os from "node:os"

function montior() {
    const oldCPUs = os.cpus()
    setTimeout(() => {
        const newCPUs = os.cpus()
        const usage = newCPUs.map((cpu, i) => {
            return {
                core: i,
                usage: calculateCPU(oldCPUs[i], newCPUs[i]) + '%'
            }
        })
        console.clear()
        console.table(usage);
        const usedMemory = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024)
        const totalMemory = os.totalmem() / (1024 * 1024 * 1024)
        
        console.log(`Memory Used: ${usedMemory.toFixed(2)} GB / ${totalMemory.toFixed(2)} GB`);
    }, 1000);
}
function calculateCPU(oldCPUs, newCPUs) {
    const oldTotal = Object.values(oldCPUs.times).reduce((a, b) => a + b);
    const newTotal = Object.values(newCPUs.times).reduce((a, b) => a + b);

    const idle = newCPUs.times.idle - oldCPUs.times.idle
    const total = newTotal - oldTotal;
    const used = total - idle

    return ((100 * used) / total).toFixed(1);
}
setInterval(montior, 1000);