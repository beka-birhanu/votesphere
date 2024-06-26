import axiosInstance from './axiosInstance';

export async function fetchMembers(groupID: string) {
    const url = `/groups/${groupID}/members`;

    return axiosInstance.get(url);
}

export async function addMember(username: string, groupID: string) {
    const url = `/groups/${groupID}/members`;

    return axiosInstance.post(url, { username });
}

export async function createGroup(adminUsername: string, groupName: string) {
    const url = '/groups';

    return axiosInstance.post(url, { groupName, adminUsername });
}
