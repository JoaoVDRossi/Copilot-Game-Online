import { useState, useEffect, useCallback } from 'react'
import { 
  Plus, Trash2, Play, Square, RotateCcw, Copy, Check, Users, 
  Hash, Clock, DoorOpen, Crown, AlertTriangle, X, Link
} from 'lucide-react'
import { Room, RoomStatus } from '../../types'
import {
  getAllRooms, createRoom, deleteRoom, startRoom, finishRoom, reopenRoom,
  removeTeamFromRoom, getRoomsByCreator, updateRoom
} from '../../utils/roomManager'
import { getAllMatchRules } from '../../utils/cardManager'
import { rounds } from '../../data/mockData'

const STATUS_CONFIG: Record<RoomStatus, { label: string; color: string; bg: string }> = {
  waiting: { label: 'Aguardando', color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  playing: { label: 'Em Jogo', color: 'text-green-400', bg: 'bg-green-400/20' },
  finished: { label: 'Encerrada', color: 'text-neutral-400', bg: 'bg-neutral-400/20' },
}

interface RoomManagementProps {
  creatorFilter?: string  // If set, only show rooms created by this ID
  readOnly?: boolean      // If true, hide create/delete/start/finish actions
}

export default function RoomManagement({ creatorFilter, readOnly }: RoomManagementProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [newRoomName, setNewRoomName] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const refreshRooms = useCallback(() => {
    setRooms(creatorFilter ? getRoomsByCreator(creatorFilter) : getAllRooms())
  }, [creatorFilter])

  useEffect(() => {
    refreshRooms()
    const interval = setInterval(refreshRooms, 5000)
    return () => clearInterval(interval)
  }, [refreshRooms])

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoomName.trim()) return

    const room = createRoom(newRoomName.trim(), creatorFilter || 'admin')
    setNewRoomName('')
    setExpandedRoom(room.id)
    refreshRooms()
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleCopyLink = (code: string) => {
    const link = `${window.location.origin}/sala/${code}`
    navigator.clipboard.writeText(link)
    setCopiedLink(code)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const handleStartRoom = (roomId: string) => {
    startRoom(roomId)
    refreshRooms()
  }

  const handleFinishRoom = (roomId: string) => {
    finishRoom(roomId)
    refreshRooms()
  }

  const handleReopenRoom = (roomId: string) => {
    reopenRoom(roomId)
    refreshRooms()
  }

  const handleDeleteRoom = (roomId: string) => {
    if (confirmDelete === roomId) {
      deleteRoom(roomId)
      setConfirmDelete(null)
      if (expandedRoom === roomId) setExpandedRoom(null)
      refreshRooms()
    } else {
      setConfirmDelete(roomId)
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  const handleRemoveTeam = (roomId: string, teamId: string) => {
    removeTeamFromRoom(roomId, teamId)
    refreshRooms()
  }

  const handleUpdateMatchConfig = (roomId: string, matchesPerRound: Record<string, number>) => {
    const allRooms = creatorFilter ? getRoomsByCreator(creatorFilter) : getAllRooms()
    const room = allRooms.find(r => r.id === roomId)
    if (room) {
      updateRoom({ ...room, matchesPerRound })
      refreshRooms()
    }
  }

  const activeRooms = rooms.filter(r => r.status !== 'finished')
  const finishedRooms = rooms.filter(r => r.status === 'finished')

  return (
    <div className="space-y-6">
      {/* Create Room Form — hidden in readOnly mode */}
      {!readOnly && (
        <div className="bg-bg-secondary rounded-xl p-6 border border-neutral-700">
          <h3 className="font-display text-lg font-bold text-neutral-50 mb-4 flex items-center gap-2">
            <DoorOpen className="w-5 h-5 text-energy-primary" />
            Criar Nova Sala
          </h3>
          <form onSubmit={handleCreateRoom} className="flex gap-3">
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="Nome da sala (ex: Workshop Manhã)"
              className="flex-1 bg-bg-tertiary text-neutral-200 rounded-lg px-4 py-3 border border-neutral-700 focus:border-energy-primary focus:outline-none transition-colors"
              maxLength={50}
            />
            <button
              type="submit"
              disabled={!newRoomName.trim()}
              className="bg-energy-primary hover:bg-energy-primary/80 disabled:bg-neutral-700 disabled:text-neutral-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Criar Sala
            </button>
          </form>
        </div>
      )}

      {/* Active Rooms */}
      {activeRooms.length > 0 && (
        <div>
          <h3 className="font-display text-lg font-bold text-neutral-50 mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-energy-primary" />
            Salas Ativas ({activeRooms.length})
          </h3>
          <div className="space-y-4">
            {activeRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                isExpanded={expandedRoom === room.id}
                onToggle={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                onCopyCode={handleCopyCode}
                copiedCode={copiedCode}
                onCopyLink={handleCopyLink}
                copiedLink={copiedLink}
                onStart={handleStartRoom}
                onFinish={handleFinishRoom}
                onReopen={handleReopenRoom}
                onDelete={handleDeleteRoom}
                onRemoveTeam={handleRemoveTeam}
                onUpdateMatchConfig={handleUpdateMatchConfig}
                confirmDelete={confirmDelete}
                readOnly={readOnly}
              />
            ))}
          </div>
        </div>
      )}

      {/* Finished Rooms */}
      {finishedRooms.length > 0 && (
        <div>
          <h3 className="font-display text-lg font-bold text-neutral-300 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Salas Encerradas ({finishedRooms.length})
          </h3>
          <div className="space-y-4">
            {finishedRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                isExpanded={expandedRoom === room.id}
                onToggle={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                onCopyCode={handleCopyCode}
                copiedCode={copiedCode}
                onCopyLink={handleCopyLink}
                copiedLink={copiedLink}
                onStart={handleStartRoom}
                onFinish={handleFinishRoom}
                onReopen={handleReopenRoom}
                onDelete={handleDeleteRoom}
                onRemoveTeam={handleRemoveTeam}
                onUpdateMatchConfig={handleUpdateMatchConfig}
                confirmDelete={confirmDelete}
                readOnly={readOnly}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {rooms.length === 0 && (
        <div className="text-center py-12 bg-bg-secondary rounded-xl border border-neutral-700">
          <DoorOpen className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-neutral-400 mb-2">
            Nenhuma sala criada
          </h3>
          <p className="text-neutral-500 max-w-md mx-auto">
            Crie uma sala para iniciar um jogo. Cada sala recebe um código único 
            que os jogadores usam para entrar.
          </p>
        </div>
      )}
    </div>
  )
}

// Sub-component for individual room cards
interface RoomCardProps {
  room: Room
  isExpanded: boolean
  onToggle: () => void
  onCopyCode: (code: string) => void
  copiedCode: string | null
  onCopyLink: (code: string) => void
  copiedLink: string | null
  onStart: (id: string) => void
  onFinish: (id: string) => void
  onReopen: (id: string) => void
  onDelete: (id: string) => void
  onRemoveTeam: (roomId: string, teamId: string) => void
  onUpdateMatchConfig: (roomId: string, matchesPerRound: Record<string, number>) => void
  confirmDelete: string | null
  readOnly?: boolean
}

function RoomCard({
  room, isExpanded, onToggle, onCopyCode, copiedCode,
  onCopyLink, copiedLink,
  onStart, onFinish, onReopen, onDelete, onRemoveTeam, onUpdateMatchConfig, confirmDelete, readOnly
}: RoomCardProps) {
  const status = STATUS_CONFIG[room.status]

  return (
    <div className="bg-bg-secondary rounded-xl border border-neutral-700 overflow-hidden">
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-bg-tertiary/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          {/* Room Code Badge */}
          <div className="bg-bg-tertiary rounded-lg px-3 py-2 border border-neutral-600">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-energy-primary" />
              <span className="font-mono text-xl font-bold text-energy-primary tracking-wider">
                {room.code}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-neutral-50 text-lg">{room.name}</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {room.teams.length} {room.teams.length === 1 ? 'time' : 'times'}
              </span>
            </div>
          </div>
        </div>

        {/* Copy Code & Link Buttons */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onCopyCode(room.code)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-tertiary hover:bg-neutral-700 transition-colors text-sm"
            title="Copiar código"
          >
            {copiedCode === room.code ? (
              <>
                <Check className="w-4 h-4 text-battle-green" />
                <span className="text-battle-green">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-400">Código</span>
              </>
            )}
          </button>
          <button
            onClick={() => onCopyLink(room.code)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-tertiary hover:bg-neutral-700 transition-colors text-sm"
            title="Copiar link de acesso direto"
          >
            {copiedLink === room.code ? (
              <>
                <Check className="w-4 h-4 text-battle-green" />
                <span className="text-battle-green">Link copiado!</span>
              </>
            ) : (
              <>
                <Link className="w-4 h-4 text-energy-primary" />
                <span className="text-energy-primary">Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-neutral-700 p-4 space-y-4">
          {/* Action Buttons — hidden in readOnly */}
          {!readOnly && (
          <div className="flex flex-wrap gap-3">
            {room.status === 'waiting' && (
              <button
                onClick={() => onStart(room.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-battle-green/20 text-battle-green hover:bg-battle-green/30 transition-colors font-semibold text-sm"
              >
                <Play className="w-4 h-4" />
                Iniciar Jogo
              </button>
            )}
            {room.status === 'playing' && (
              <button
                onClick={() => onFinish(room.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-battle-red/20 text-battle-red hover:bg-battle-red/30 transition-colors font-semibold text-sm"
              >
                <Square className="w-4 h-4" />
                Encerrar Sala
              </button>
            )}
            {room.status === 'finished' && (
              <button
                onClick={() => onReopen(room.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 transition-colors font-semibold text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reabrir Sala
              </button>
            )}
            <button
              onClick={() => onDelete(room.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold text-sm ${
                confirmDelete === room.id
                  ? 'bg-battle-red text-white'
                  : 'bg-battle-red/20 text-battle-red hover:bg-battle-red/30'
              }`}
            >
              {confirmDelete === room.id ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Confirmar Exclusão
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Excluir Sala
                </>
              )}
            </button>
          </div>
          )}

          {/* Matches per Round Config — hidden in readOnly */}
          {!readOnly && room.status !== 'finished' && (
            <div>
              <h5 className="font-semibold text-neutral-300 mb-3 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Matches por Round
              </h5>
              <div className="grid gap-2">
                {rounds.map(round => {
                  const allRules = getAllMatchRules()
                  const maxRules = allRules.filter(r => r.roundId === round.id && r.active).length
                  const currentValue = room.matchesPerRound?.[round.id] ?? maxRules
                  return (
                    <div key={round.id} className="flex items-center gap-3 bg-bg-tertiary rounded-lg px-3 py-2">
                      <span className="text-sm text-neutral-300 min-w-[80px]">Round {round.id.replace('round-', '')}</span>
                      <input
                        type="number"
                        min={1}
                        max={maxRules}
                        value={currentValue}
                        onChange={(e) => {
                          const val = Math.max(1, Math.min(maxRules, parseInt(e.target.value) || 1))
                          const updated = { ...(room.matchesPerRound || {}), [round.id]: val }
                          onUpdateMatchConfig(room.id, updated)
                        }}
                        className="w-16 px-2 py-1 rounded bg-bg-primary border border-neutral-600 text-neutral-200 text-sm text-center focus:border-energy-primary focus:outline-none"
                      />
                      <span className="text-xs text-neutral-500">de {maxRules} disponíveis</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Teams List */}
          <div>
            <h5 className="font-semibold text-neutral-300 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Times na Sala
            </h5>
            {room.teams.length === 0 ? (
              <div className="text-center py-6 bg-bg-tertiary rounded-lg">
                <Users className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">
                  Nenhum time ainda. Compartilhe o código <span className="font-mono font-bold text-energy-primary">{room.code}</span> com os jogadores!
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {[...room.teams]
                  .sort((a, b) => b.score - a.score)
                  .map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between bg-bg-tertiary rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-neutral-500 w-8 text-center">
                          {index === 0 && room.teams.length > 1 ? '🏆' : `#${index + 1}`}
                        </span>
                        <div>
                          <p className="font-semibold text-neutral-200">{team.name}</p>
                          <div className="flex items-center gap-3 text-xs text-neutral-500">
                            <span>{team.members.length} {team.members.length === 1 ? 'jogador' : 'jogadores'}</span>
                            <span>•</span>
                            <span className="text-energy-primary font-semibold">{team.score} pts</span>
                            <span>•</span>
                            <span>{team.completedRounds.length}/4 rounds</span>
                            {team.currentRound && (
                              <>
                                <span>•</span>
                                <span className="text-yellow-400">Rodada {team.currentRound.replace('round-', '')}</span>
                              </>
                            )}
                          </div>
                          {team.members.length > 0 && (
                            <p className="text-xs text-neutral-600 mt-1">
                              {team.members.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                      {!readOnly && room.status === 'waiting' && (
                        <button
                          onClick={() => onRemoveTeam(room.id, team.id)}
                          className="p-1 text-neutral-600 hover:text-battle-red transition-colors"
                          title="Remover time"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Room Info */}
          <div className="text-xs text-neutral-600 flex items-center gap-4 pt-2 border-t border-neutral-800">
            <span>ID: {room.id}</span>
            <span>Criada: {new Date(room.createdAt).toLocaleString('pt-BR')}</span>
            {room.startedAt && <span>Iniciada: {new Date(room.startedAt).toLocaleString('pt-BR')}</span>}
            {room.finishedAt && <span>Encerrada: {new Date(room.finishedAt).toLocaleString('pt-BR')}</span>}
          </div>
        </div>
      )}
    </div>
  )
}
