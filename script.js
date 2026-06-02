// 📚 এখানে আপনি আপনার ইচ্ছা মতো অসংখ্য লেখা/গল্প যোগ করতে পারবেন।
// জাস্ট নিচের ফরম্যাট (title আর body) মেইনটেইন করে কমা (,) দিয়ে বাড়িয়ে যাবেন।
const stories = [
    {
        id: 1,
        title: "১. প্রথম অধ্যায়: একাকীত্বের নীল আকাশ",
        body: `এটি আপনার প্রথম গল্পের সম্পূর্ণ বিস্তারিত রূপ। এখানে আপনি আপনার মনের মতো যত খুশি বড় লেখা লিখতে পারবেন। 
        
        লাইন ব্রেক বা এন্টার দিলে সেটিও অ্যাপের ভেতর সুন্দরভাবে দেখাবে। এই অ্যাপটি সম্পূর্ণ অফলাইনে কাজ করার জন্য উপযোগী করে তৈরি করা হয়েছে।`
    },
    {
        id: 2,
        title: "২. দ্বিতীয় অধ্যায়: স্মৃতির জানালা",
        body: `এটি আপনার দ্বিতীয় গল্পের ভেতরের সম্পূর্ণ লেখা। 
        
        ডিজাইনটি এমনভাবে করা হয়েছে যাতে রাতে বা দিনে যেকোনো সময় পড়তে চোখের ওপর কোনো চাপ না পড়ে।`
    },
    {
        id: 3,
        title: "৩. তৃতীয় অধ্যায়: নতুন দিগন্তের খোঁজে",
        body: `এটি আপনার তৃতীয় গল্পের ডেমো টেক্সট। আপনি চাইলে এই জাভাস্ক্রিপ্ট ফাইলের ভেতর আপনার পুরো বইয়ের সব চ্যাপ্টার টাইপ করে রেখে দিতে পারেন।`
    }
];

let currentOpenStory = null;

// অ্যাপ চালু হলে লিস্ট তৈরি করার ফাংশন
function loadStories() {
    const container = document.getElementById('story-list-container');
    container.innerHTML = '';
    
    stories.forEach(story => {
        const div = document.createElement('div');
        div.className = 'story-item';
        div.onclick = () => openReader(story);
        div.innerHTML = `
            <h3>${story.title}</h3>
            <span class="arrow-icon">→</span>
        `;
        container.appendChild(div);
    });
}

// লাইনে ক্লিক করলে পুরো লেখা খোলার ফাংশন
function openReader(story) {
    currentOpenStory = story;
    document.getElementById('story-title').innerText = story.title;
    document.getElementById('story-body').innerText = story.body;
    document.getElementById('reader-screen').style.display = 'flex';
}

// রিডার স্ক্রিন বন্ধ করার ফাংশan
function closeReader() {
    document.getElementById('reader-screen').style.display = 'none';
}

// সার্চ করার ম্যাজিক ফাংশন
function filterStories() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const items = document.getElementsByClassName('story-item');
    
    stories.forEach((story, index) => {
        if(story.title.toLowerCase().includes(searchTerm) || story.body.toLowerCase().includes(searchTerm)) {
            items[index].style.display = 'flex';
        } else {
            items[index].style.display = 'none';
        }
    });
}

// 📥 ১ সেকেন্ডে টেক্সট ফাইল হিসেবে গল্প ডাউনলোড করার ফাংশন (যা ১০০% কাজ করবে)
function downloadStory() {
    if (!currentOpenStory) return;
    
    const textContent = `শিরোনাম: ${currentOpenStory.title}\n\n${currentOpenStory.body}`;
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    
    // ফাইলের নাম হবে গল্পের শিরোনাম অনুযায়ী
    link.download = `${currentOpenStory.title}.txt`;
    link.href = window.URL.createObjectURL(blob);
    link.style.display = "none";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// অ্যাপ ওপেন হলেই যেন লিস্ট লোড হয়
window.onload = loadStories;
