"use client";

import Link from "next/link";
import { FetchedUserTypes } from "@/types";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { toast } from "sonner";
import DeleteConfirmModal from "./deleteConfirmModal";

export default function UsersPage() {
  const [users, setUsers] = useState<FetchedUserTypes[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<FetchedUserTypes | null>(
    null,
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(BEendpoints.get_users);
        if (!res.data.ok) throw new Error("failed to fetch products");

        console.log("users: ", res.data.data);
        setUsers(res.data.data);
      } catch (err) {
        toast.error(err instanceof Error && err.message);
      }
    };
    fetch();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await axios.delete(BEendpoints.delete_user(deleteTarget.id));
      if (!res.data.ok) throw new Error(res.data.message || "User not deleted");
      setUsers((prev) => prev.filter((user) => user.id !== deleteTarget.id));
      toast.success(`Deleted User ${deleteTarget.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "User deletion failed");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-zinc-700/50">
        <h2 className="text-lg font-bold">User Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700/50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user?.id}
                className="border-b border-zinc-700/50 hover:bg-zinc-900/50 transition"
              >
                <td className="px-6 py-4 text-sm font-semibold">
                  {user?.name}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">
                  {user?.email}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">
                  {user?.createdAt?.slice(0, 10)}
                </td>
                <td className="px-6 py-4 text-sm font-semibold">
                  {user?.order?.length}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/users/${user?.id}`}
                      className="p-1 hover:bg-amber-400/10 rounded transition"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(user)}
                      className="p-1 hover:bg-red-500/10 rounded transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete this User?"
        description={`This will delete User ${deleteTarget?.name}. This action can't be undone`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
