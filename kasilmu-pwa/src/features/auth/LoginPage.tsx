import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, TextField, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "./useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/");
    } catch (err: unknown) {
      const e = err as {
        code?: string;
        response?: {
          status?: number;
          data?: { message?: string; errors?: { username?: string[] } };
        };
      };
      let msg: string;
      if (!e.response) {
        // Tidak ada response = gagal di level jaringan (timeout / koneksi
        // putus / diblok), bukan kredensial salah.
        msg =
          e.code === "ECONNABORTED"
            ? "Koneksi ke server timeout. Cek jaringan lalu coba lagi."
            : `Tidak bisa terhubung ke server (${e.code || "network error"}). Cek jaringan lalu coba lagi.`;
      } else {
        msg =
          e.response.data?.errors?.username?.[0] ||
          e.response.data?.message ||
          `Login gagal (HTTP ${e.response.status})`;
      }
      setError(msg);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ p: 4, width: 400 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
        >
          Kasilmu
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Sistem Informasi Manajemen Bimbel
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Masuk
          </Button>
        </Box>

        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: "block", textAlign: "center", mt: 2 }}
        >
          v{__APP_VERSION__} · {new Date(__BUILD_TIME__).toLocaleString("id-ID")}
        </Typography>
      </Card>
    </Box>
  );
}
