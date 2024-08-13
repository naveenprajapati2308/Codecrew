#include <iostream>
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
    }