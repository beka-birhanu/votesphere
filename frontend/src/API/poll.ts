import axiosInstance from './axiosInstance';

export async function fetchPolls(groupID: string) {
    const url = 'http://localhost:9000/polls?' + new URLSearchParams({ groupId: groupID });

    return axiosInstance.get(url);
}

export async function addPoll(adminUsername: string, groupID: string, poll: { question: string; options: string[] }) {
    const url = `http://localhost:9000/polls`;

    return axiosInstance.post(url, { adminUsername, groupID, poll });
}

export async function castVote(pollID: string, optionID: string) {
    const url = `http://localhost:9000/polls/${pollID}/vote?` + new URLSearchParams({ optionId: optionID });

    return axiosInstance.patch(url);
}
