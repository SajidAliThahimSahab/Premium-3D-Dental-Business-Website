import Modal from '../common/Modal.jsx'

export default function Lightbox({ item, onClose }) {
  return (
    <Modal isOpen={!!item} onClose={onClose} title={item?.title} labelledBy="lightbox-title">
      {item && (
        <div>
          <div
            className="aspect-[4/3] w-full rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${item.after[0]}, ${item.after[1]})` }}
          />
          <p className="mt-4 text-sm text-porcelain-100/60">
            Category: <span className="text-porcelain-50">{item.category}</span>
          </p>
        </div>
      )}
    </Modal>
  )
}
