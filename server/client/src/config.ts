cat > server/client/src/config.ts <<'EOF'
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
