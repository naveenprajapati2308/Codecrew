import { useState } from "react";


export default function SampleCode() {

    const [code, setCode] = useState(`#include <iostream>
    #include <vector>
    
    using namespace std;
    
    void solve(){
        int n , key;
        cin>>n>>key;
    
        vector<int> v(n);
        for(auto &it : v) cin>>it;
    
        for(int i=0 ; i<n ; i++){
            if(v[i] == key){
                cout<<i<<endl;
                return;
            }
        }
        cout<<-1<<endl;
    }
    
    int main() {
      
        int t;
        cin>>t;
    
        while(t--){
            solve();
        }
        return 0;
    }`);
    
      return (
        <div className="container mt-5">
          <h1>Solution in C++</h1>
          <div className="border p-3 rounded">
            <textarea
              className="form-control"
              rows="30"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
          </div>
        </div>
      );
}