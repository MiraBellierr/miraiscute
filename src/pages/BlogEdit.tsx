import Navigation from "../parts/Navigation";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Toast from "../parts/Toast";

import React, { useEffect, useState } from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE } from '@/lib/config';
import { useAuth } from '@/states/AuthContext'




const BlogEdit = () => {
    const auth = useAuth()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState({});
    const [shortDescription, setShortDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setSubmitSuccess] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const [postId, setPostId] = useState<string | null>(null);

    useEffect(() => {
        if (!auth?.token) {
            navigate('/login')
        }
    }, [auth, navigate])

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');
        if (!id) return;

        setPostId(id);

        const load = async () => {
            try {
                const res = await fetch(`${API_BASE}/posts/${id}`);
                if (!res.ok) throw new Error('Failed to load post');
                const data = await res.json();

                // If the post has an owner, ensure current user is the owner
                if (data.userId) {
                    const currentUserId = auth?.user?.id;
                    if (!currentUserId || String(currentUserId) !== String(data.userId)) {
                        setToastMessage('❌ You are not allowed to edit this post');
                        setShowToast(true);
                        setTimeout(() => {
                            setShowToast(false);
                            setToastMessage('');
                            navigate('/blog');
                        }, 2000);
                        return;
                    }
                }

                setTitle(data.title || '');
                setContent(data.content || {});
                setShortDescription(data.shortDescription || '');
                setThumbnail(data.thumbnail || '');
            } catch (err) {
                console.error('Failed to load post for edit', err);
            }
        };

        load();
    }, [location.search]);


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        
        try {
            const blogData: Record<string, unknown> = {
                title,
                content: content,
                shortDescription: shortDescription || undefined,
                thumbnail: thumbnail || undefined,
            };
            if (auth?.user?.id) blogData.userId = auth.user.id

            const method = postId ? 'PUT' : 'POST';
            const url = postId ? `${API_BASE}/posts/${postId}` : `${API_BASE}/posts`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
                },
                body: JSON.stringify(blogData),
            });

            if (!response.ok) throw new Error('Failed to save post');

            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 3000);
            
            setTitle('');
            setContent({});
            setShortDescription('');
            setThumbnail('');

            setToastMessage("🎉 Post published successfully!");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                setToastMessage("");
                navigate("/blog");
            }, 3000);
        } catch (error) {
            setToastMessage("❌ Failed to publish post");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                setToastMessage("");
            }, 3000);
            console.error('Error saving blog post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen text-blue-900 font-[sans-serif] flex flex-col">
            <Header />

            <div className="min-h-screen flex flex-col bg-cover bg-no-repeat bg-scroll" style={{ backgroundImage: 'var(--page-bg)' }}>
                <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
                    <div className="flex-grow flex-col space-y-4">
                        <Navigation />
                        <div className=" mt-3 mb-auto justify-center items-center flex">
                            <img className="border-border-blue-300 rounded-lg shadow" src="https://media1.tenor.com/m/KHZPhIUhSBsAAAAC/miss-kobayashi.gif" />
                        </div>
                    </div>

                    <main className="w-full lg:w-3/5 space-y-2 p-4">
                        <h2 className="font-bold text-2xl text-blue-600">Create a new Post</h2>
                        
                        <form onSubmit={handleSubmit}>      
                                            {}

                            <div className="flex flex-col p-2 space-y-2">
                                <label className="font-bold text-blue-600" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter the title of the post"
                                    className="form-input border rounded-lg border-blue-300 p-2"
                                    required
                                />
                            </div>

                                <div className="flex flex-col p-2 space-y-2">
                                    <label className="font-bold text-blue-600" htmlFor="shortDescription">Short description</label>
                                    <input
                                        type="text"
                                        id="shortDescription"
                                        name="shortDescription"
                                        value={shortDescription}
                                        onChange={(e) => setShortDescription(e.target.value)}
                                        placeholder="Brief summary (for listings, ~160 chars)"
                                        className="form-input border rounded-lg border-blue-300 p-2"
                                    />
                                </div>

                                <div className="flex flex-col p-2 space-y-2">
                                    <label className="font-bold text-blue-600" htmlFor="thumbnail">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        id="thumbnail"
                                        name="thumbnail"
                                        value={thumbnail}
                                        onChange={(e) => setThumbnail(e.target.value)}
                                        placeholder="Optional thumbnail image URL"
                                        className="form-input border rounded-lg border-blue-300 p-2"
                                    />
                                </div>

                            <div className="flex flex-col p-2 space-y-2">
                                <div className="block 2xl:block">
                                    <label className="font-bold text-blue-600" htmlFor="content">Content</label>
                                    <SimpleEditor onContentChange={setContent} initialContent={content} />
                                </div>
                                                  
                            </div>
                            
                            <div className="flex p-2">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:animate-wiggle"
                                >
                                    {isSubmitting ? "Publishing..." : "Publish Post"}
                                </button>
                            </div>
                        </form>
                    </main>

                    <div className="flex-col">

                        <div className="mt-3 mb-auto lg:w-[200px]">
                        </div>
                    </div>
                </div>
            </div>

            {showToast && (
            <Toast message={toastMessage} onClose={() => {
                setShowToast(false);
                setToastMessage("");
                navigate("/blog");
            }} />
            )}
            <Footer />
        </div>
    )
}

export default BlogEdit;