import axios from 'axios'

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const commonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function filterJSON(res) {
    return res.data;
}

function filterStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        throw {
            status: res.status,
            detail: res.data
        }
    }
}

function rp(path, params, method = 'POST', sessionId) {
    let headers = {
        'SessionID': sessionId
    }

    let options = {
        headers: {
            ...headers,
        },
        method
    }

    options.data = JSON.stringify(params)

    return axios(path, options).then(filterStatus).then(filterJSON).then((response) => {
        console.log('response', response)
        return response
    }).catch((error) => {
        console.log('error', error)
        return { error: error };
    })
}

class AxiosUtil {
    static post(path, params,sessionId) {
        return rp(path, params, 'POST', sessionId)
    }
}

export default AxiosUtil