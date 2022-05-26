const core = require('@actions/core')
const axios = require('axios')

async function main() {
    try {
        const runTimeUrl = process.env.ACTIONS_RUNTIME_URL;
        const workflowRun = process.env.GITHUB_RUN_ID;
        const runTimeToken = process.env.ACTIONS_RUNTIME_TOKEN;
        core.info(`runTimeUrl = ${runTimeUrl}`);
        core.info(`workflowRun = ${workflowRun}`);
        core.info(`runTimeToken = ${runTimeToken}`);
        const artifactExgUrl = `${runTimeUrl}_apis/pipelines/workflows/${workflowRun}/artifacts?api-version=6.0-preview`;
        core.info(`Artifact URL: ${artifactExgUrl}`);
        const {data} = await axios.get(artifactExgUrl, {
            headers: {
                Authorization: `Bearer ${runTimeToken}`,
                'Content-Type': 'application/json'
            }
        });
        core.info(JSON.stringify(data));
    } catch (error) {
      core.info(JSON.stringify(error));
      core.setFailed(error);
    }
}

main()
