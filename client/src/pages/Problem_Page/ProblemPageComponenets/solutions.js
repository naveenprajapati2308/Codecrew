const cpp = `#include <iostream>
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
    }`;

const c = `#include <stdio.h>

int find_element_index(int n, int key, int arr[]) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i;
        }
    }
    return -1;
}

int main() {
    int t;
    scanf("%d", &t);

    for (int i = 0; i < t; i++) {
        int n, key;
        scanf("%d %d", &n, &key);

        int arr[n];
        for (int j = 0; j < n; j++) {
            scanf("%d", &arr[j]);
        }

        int index = find_element_index(n, key, arr);
        printf("%d\\n", index);
    }

    return 0;
}
`

const java = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();

        for (int i = 0; i < t; i++) {
            int n = scanner.nextInt();
            int key = scanner.nextInt();
            int[] arr = new int[n];
            for (int j = 0; j < n; j++) {
                arr[j] = scanner.nextInt();
            }
            int index = findElementIndex(n, key, arr);
            System.out.println(index);
        }
    }

    public static int findElementIndex(int n, int key, int[] arr) {
        for (int i = 0; i < n; i++) {
            if (arr[i] == key) {
                return i;
            }
        }
        return -1;
    }
}
`

const python = `import sys

def find_element_index(n, key, arr):
    for i in range(n):
        if arr[i] == key:
            return i
    return -1

lines = sys.stdin.readlines()
t = int(lines[0].strip())

for i in range(1, len(lines), 2):
    n, key = map(int, lines[i].strip().split())
    arr = list(map(int, lines[i+1].strip().split()))
    index = find_element_index(n, key, arr)
    print(index)
    `

export {
    cpp,
    c,
    java,
    python
}

