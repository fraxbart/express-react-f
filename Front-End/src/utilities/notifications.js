import { toast } from 'react-hot-toast'

export class Toast {

    constructor(message) {
        this.message = message
    }

    success() {
        return toast.success(this.message)
    }

    warning() {
        return toast.error(this.message)
    }

    missedFile() {
        return toast.error(this.message)
    }
}
