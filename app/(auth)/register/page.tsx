export default function RegisterPage() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
