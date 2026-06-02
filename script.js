// 📚 আপনার গল্পের লাইব্রেরি ডাটাবেজ
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

// হোম স্ক্রিনে সিরিজের সুন্দর লিস্ট লোড করার ফাংশন
function loadStories() {
    const container = document.getElementById('story-list-container');
    container.innerHTML = '';
    
    stories.forEach(story => {
        const div = document.createElement('div');
        div.className = 'story-item';
        div.onclick = () => openReader(story);
        div.innerHTML = `
            <h3>${story.title}</h3>
            <i class="fa-solid fa-chevron-right arrow-icon"></i>
        `;
        container.appendChild(div);
    });
}

// লাইন সিরিজে ক্লিক করলে রিডার মোড খোলার ফাংশন
function openReader(story) {
    currentOpenStory = story;
    document.getElementById('story-title').innerText = story.title;
    document.getElementById('story-body').innerText = story.body;
    document.getElementById('reader-screen').style.display = 'flex';
}

// রিডার স্ক্রিন বন্ধ করার ফাংশন
function closeReader() {
    document.getElementById('reader-screen').style.display = 'none';
}

// রিয়েল-টাইম সার্চ ফিল্টার
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

// 📥 প্রফেশনাল ডাউনলোড ম্যানেজার + অ্যানিমেটেড পপ-আপ মেসেজ
function downloadStory() {
    if (!currentOpenStory) return;
    
    try {
        const textContent = `শিরোনাম: ${currentOpenStory.title}\n\n${currentOpenStory.body}`;
        const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        
        link.download = `${currentOpenStory.title}.txt`;
        link.href = window.URL.createObjectURL(blob);
        link.style.display = "none";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 🎉 ডাউনলোড সফল হলে আধুনিক অ্যানিমেটেড পপ-আপ প্রদর্শন
        Swal.fire({
            title: 'ডাউনলোড সম্পন্ন!',
            text: `"${currentOpenStory.title}" ফাইলটি আপনার ডিভাইসে সেভ হয়েছে।`,
            icon: 'success',
            confirmButtonText: 'ধন্যবাদ',
            confirmButtonColor: '#2a5298',
            timer: 3000
        });
    } catch (error) {
        Swal.fire({
            title: 'দুঃখিত!',
            text: 'ডাউনলোড করতে একটি সমস্যা হয়েছে।',
            icon: 'error',
            confirmButtonColor: '#e53e3e'
        });
    }
}

window.onload = loadStories;
