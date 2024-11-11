import { useState } from "react";

export default function BlogFelvetel() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [create_at, SetCreate_at] = useState<Date>();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const newBlog = {
            title: title,
            content: content,
            create_at: create_at
        }
        try {
            const response = await fetch('http://localhost:3000/blogs', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBlog)
            })
            if (!response.ok){
                const errorData = await response.json();
                setError(errorData.error)
                throw new Error(`Hiba történt: ${response.status}`)
            }

            setSuccess(true);
            setTitle(''); setContent(''); SetCreate_at(new Date());
        } catch (err: any) {
            setError(err.message)
        } finally {

        }
    }
    return <>
        <h2>Blog felvétel</h2>
        <a href="/telefonok">Visza a listához</a><br />
        <a href="/telefontorles">Telefonok törlése</a>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Brand:</p>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
              
            </label>
            <label>
                <p>Model:</p>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                
            </label>
            <label>
                <p>Price:</p>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                />
               
            </label>
            <button type="submit">Telefon felvétele</button>
            { error && <p>{ error }</p> }
            { success && <p>Sikeresen megtörtént a telefon felvétele.</p> }
        </form>
    </>
}