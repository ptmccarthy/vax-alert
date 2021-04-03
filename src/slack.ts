import axios from 'axios';

const slackHook = process.env.SLACK_HOOK;

export default class Slack {
    static async notify(text: string) {
        if (!slackHook) {
            console.error('SLACK_HOOK environment variable not set');
            return;
        }

        return axios.post(slackHook, JSON.stringify({ text }));
    }
}
