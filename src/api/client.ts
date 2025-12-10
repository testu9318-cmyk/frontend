export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
        console.log(' Fetching:', url, options.method || 'GET');
        
        const res = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
        });

        console.log(' Response:', res.status, res.statusText);

        // Clone the response so we can read it multiple times if needed
        const clonedRes = res.clone();
        
        // Try to parse as JSON first
        let data;
        try {
            data = await res.json();
            console.log('📦 Response data:', data);
        } catch (jsonError) {
            // If JSON parsing fails, get the text to see what was returned
            const text = await clonedRes.text();
            console.error('❌ JSON parse error:', jsonError);
            console.error('📄 Response text:', text);
            throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
        }

        if (!res.ok) {
            throw new Error(data.msg || data.message || "API Error");
        }

        return data as T;
        
    } catch (error) {
        console.error('💥 Fetch error:', error);
        throw error;
    }
}

//  Correct URL
export async function login(email: string, password: string) {
    return apiFetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function logout() {
    return apiFetch("http://localhost:5000/auth/logout", { // Fixed: added /api
        method: "POST",
    });
}

export type RegisterDto = {
    firstName: string; // Changed from 'name' to match backend
    lastName: string;  // Added - backend expects this
    email: string;
    password: string;
};

export type RegisterResponse = {
    msg: string; // Changed from 'success' and 'message' to match backend
    userObj: {   // Changed from 'user' to match backend
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isEmailVerified: boolean;
        role: string;
        createdAt: string;
        updatedAt: string;
    };
};

// Refactored to use apiFetch for consistency
export async function registerUser(data: RegisterDto): Promise<RegisterResponse> {
    return apiFetch("http://localhost:5000/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}


export async function checkAuth() {
  const res = await fetch("http://localhost:5000/auth/profile", {
    method: "GET",
    credentials: "include", // 
  });

  return res.status === 200;
}
