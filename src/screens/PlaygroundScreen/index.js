const languageCodeMap = {
    cpp:54,
    python:92,
    javascript:93,
    java:91
}

const input = "10 12" // a = 10 b = 12 20+36 = 56
const code = `
#include<iostream>
using namespace std;
int main(){
  int a,b;
  cin>>a>>b;
  cout<<2*a + 3*b<<"output"<<endl;
  return 0;
}
`


const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': 'fc6ba7bf6dmsh2e5cd61d3fbe9a8p1ba480jsn2cd676e3334c',
		'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		language_id: 52,
		source_code: btoa(code),
		stdin: btoa(input)
	}
)};



async function callApi(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        const tokenId = result.token;
        let statusCode = 2;
        while(statusCode === 2 || statusCode ===1 ){
          let result  = await getSubmission(tokenId); 
          statusCode = result.status_id;
          console.log(result.status)
        }
    } catch (error) {
        console.error(error);
    }
}
// callApi();

async function getSubmission(tokenId){
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fc6ba7bf6dmsh2e5cd61d3fbe9a8p1ba480jsn2cd676e3334c',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error({error});
    }
}