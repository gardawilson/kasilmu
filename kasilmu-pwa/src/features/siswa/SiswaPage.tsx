import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  Add,
  Search,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useSiswa, useDeleteSiswa } from "./useSiswa";
import SiswaForm from "./SiswaForm";
import DeleteDialog from "../../components/ui/DeleteDialog";
import PageHeader from "../../components/ui/PageHeader";
import FilterBar, {
  filterFieldSx,
  filterFieldSlotProps,
} from "../../components/ui/FilterBar";
import StatusChip, { type StatusTone } from "../../components/ui/StatusChip";
import { useAuth } from "../auth/useAuth";
import type { Siswa } from "../../types";

const STATUS_TONE: Record<string, StatusTone> = {
  aktif: "green",
  nonaktif: "orange",
  lulus: "blue",
};

const groupLabelSx = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.06em",
  color: "#a0aec0",
  textTransform: "uppercase" as const,
};

function MemberCard({
  siswa,
  isAdmin,
  onOpen,
}: {
  siswa: Siswa;
  isAdmin: boolean;
  onOpen: () => void;
}) {
  return (
    <Paper
      onClick={isAdmin ? onOpen : undefined}
      sx={{
        p: 3.5,
        borderRadius: "20px",
        textAlign: "center",
        border: "0.3px solid #ececec",
        ...(isAdmin && {
          cursor: "pointer",
          transition: "box-shadow .2s ease",
          "&:hover": { boxShadow: "0 10px 34px rgb(0 0 0 / 0.09)" },
        }),
      }}
    >
      <Avatar
        src={siswa.foto ?? undefined}
        sx={{
          width: 110,
          height: 110,
          mx: "auto",
          mb: 2,
          fontSize: 34,
          fontWeight: 700,
          bgcolor: "rgba(72,128,255,0.12)",
          color: "#4880ff",
        }}
      >
        {siswa.nama.charAt(0).toUpperCase()}
      </Avatar>

      <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#202224" }}>
        {siswa.nama}
      </Typography>
      <Typography sx={{ fontSize: 13, color: "#94a3b8", mt: 0.25 }}>
        {siswa.nis}
      </Typography>

      <Box sx={{ mt: 1.5, display: "flex", justifyContent: "center" }}>
        <StatusChip label={siswa.status} tone={STATUS_TONE[siswa.status] ?? "grey"} />
      </Box>

      <Box sx={{ mt: 2.5, textAlign: "left" }}>
        <Typography sx={groupLabelSx}>Asal Sekolah</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(32,34,36,0.8)", mt: 0.25 }}>
          {siswa.sekolah?.nama || "—"}
        </Typography>

        <Typography sx={{ ...groupLabelSx, mt: 1.5 }}>Kelas</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(32,34,36,0.8)", mt: 0.25 }}>
          {siswa.kelas?.length
            ? siswa.kelas.map((k) => k.nama).join(", ")
            : "Belum ada kelas"}
        </Typography>

        <Typography sx={{ ...groupLabelSx, mt: 1.5 }}>Paket Diambil</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(32,34,36,0.8)", mt: 0.25 }}>
          {siswa.siswa_pakets?.length
            ? siswa.siswa_pakets
                .map(
                  (sp) =>
                    `${sp.paket?.nama ?? "-"}${
                      sp.sisa_pertemuan != null ? ` (sisa ${sp.sisa_pertemuan})` : ""
                    }`,
                )
                .join(", ")
            : "Belum ada paket"}
        </Typography>
      </Box>
    </Paper>
  );
}

const gridSx = {
  display: "grid",
  gap: 2.5,
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
  },
};

export default function SiswaPage() {
  const { user } = useAuth();
  const isAdmin = !!user?.roles?.some((r) => r.name === "admin");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Siswa | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useSiswa({ search, status, page, per_page: perPage });
  const del = useDeleteSiswa();

  const total = data?.meta?.total ?? 0;
  const lastPage = data?.meta?.last_page ?? 1;
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const filterActive = search !== "" || status !== "";

  return (
    <Box>
      <PageHeader
        title="Data Siswa"
        subtitle="Kelola data siswa bimbingan belajar"
        action={
          isAdmin && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
            >
              Tambah Siswa
            </Button>
          )
        }
      />

      <FilterBar
        onReset={() => {
          setSearch("");
          setStatus("");
          setPage(1);
        }}
        resetDisabled={!filterActive}
      >
        <TextField
          variant="standard"
          placeholder="Cari nama atau NIS..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <Search sx={{ mr: 1, color: "#94a3b8", fontSize: 18 }} />
              ),
            },
          }}
          sx={{ ...filterFieldSx, minWidth: 220 }}
        />
        <TextField
          select
          variant="standard"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          slotProps={filterFieldSlotProps}
          sx={filterFieldSx}
        >
          <MenuItem value="">Semua Status</MenuItem>
          <MenuItem value="aktif">Aktif</MenuItem>
          <MenuItem value="nonaktif">Nonaktif</MenuItem>
          <MenuItem value="lulus">Lulus</MenuItem>
        </TextField>
      </FilterBar>

      {isLoading ? (
        <Box sx={gridSx}>
          {[...Array(8)].map((_, i) => (
            <Paper key={i} sx={{ p: 3.5, borderRadius: "20px", textAlign: "center" }}>
              <Skeleton variant="circular" width={110} height={110} sx={{ mx: "auto", mb: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
              <Skeleton variant="text" width="40%" sx={{ mx: "auto" }} />
              <Skeleton variant="text" width="70%" sx={{ mx: "auto", mt: 1 }} />
            </Paper>
          ))}
        </Box>
      ) : !data?.data?.length ? (
        <Paper sx={{ py: 10, textAlign: "center", borderRadius: "20px" }}>
          <Inbox sx={{ fontSize: 40, color: "#cbd5e1", mb: 1 }} />
          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
            Belum ada data siswa
          </Typography>
        </Paper>
      ) : (
        <>
          <Box sx={gridSx}>
            {data.data.map((siswa: Siswa) => (
              <MemberCard
                key={siswa.id}
                siswa={siswa}
                isAdmin={isAdmin}
                onOpen={() => {
                  setEditData(siswa);
                  setOpen(true);
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(32,34,36,0.6)" }}>
              Menampilkan {from}–{to} dari {total}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                sx={{ border: "0.6px solid #d5d5d5", borderRadius: "6px", color: "#202224" }}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                disabled={page >= lastPage}
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                sx={{ border: "0.6px solid #d5d5d5", borderRadius: "6px", color: "#202224" }}
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}

      {open && (
        <SiswaForm
          open={open}
          onClose={() => setOpen(false)}
          editData={editData}
          onDelete={
            editData
              ? () => {
                  const id = editData.id;
                  setOpen(false);
                  setDeleteId(id);
                }
              : undefined
          }
        />
      )}

      <DeleteDialog
        open={!!deleteId}
        title="Hapus Siswa"
        description="Data siswa ini akan dihapus permanen. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await del.mutateAsync(deleteId!);
          setDeleteId(null);
        }}
      />
    </Box>
  );
}
