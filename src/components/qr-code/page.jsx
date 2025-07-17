import QRCode from 'react-qr-code';

export default function QrGenerator ({ upi_id, ac_name, amount, size, code }) {
    // const payload = `upi://pay?pa=${upi_id}&am=${amount}&cu=INR`
    const payload = `upi://pay?pa=${upi_id}&pn=${ac_name}&am=${amount}&cu=INR&tn=${code}`
    return (
        <div>
            <QRCode value={payload} size={size} />
        </div>
    )
}
