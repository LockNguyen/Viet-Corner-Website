'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Complete translations object with all sections
const translations = {
  en: {
    // Church Info
    'church.name': 'Hoi Thanh Tin Lanh Viet Nam',
    'church.subtitle': 'Vietnamese Evangelical Church',

    // Navigation
    'navigation.about': 'About Us',
    'navigation.stories': 'Our Stories',
    'navigation.events': 'Events',
    'navigation.contact': 'Contact',
    'navigation.joinUs': 'Join Us',

    // Hero Section
    'hero.title': 'Making God Known',
    'hero.subtitle': 'Through Life Together',
    'hero.description': "Join us at the Vietnamese Evangelical Church as we inspire one another to love God and do good. We're a simple community learning and growing in faith together.",
    'hero.planVisit': 'Plan Your Visit',
    'hero.ourStories': 'Our Stories',

    // Welcome Section
    'welcome.title': "We're glad you're here",
    'welcome.description': "Jesus was a simple man with a simple plan to make God known. Together, we constantly look at Jesus through God's Word, inspired to become whatever destiny requires so that we can give hope to the many still unfamiliar with God's amazing love.",

    // Ministries Section
    'ministries.title': 'We are a church dedicated to walking with God',
    'ministries.subtitle': 'We believe that what makes church special is not only the Sunday sermon, but also the spiritual connections we build with God and each other.',
    'ministries.sundayServices.title': 'Sunday Services',
    'ministries.sundayServices.description': 'Join us for engaging and faith-building messages from the Bible, along with singing, fellowship, and classes for kids.',
    'ministries.sundayServices.link': 'View times →',
    'ministries.smallGroups.title': 'Small Groups',
    'ministries.smallGroups.description': 'Connect with friends at a similar life point in your neighborhood. Get to know each other on a deeper level through discussions about God and life.',
    'ministries.smallGroups.link': 'Get connected →',
    'ministries.bibleStudies.title': 'Bible Studies',
    'ministries.bibleStudies.description': 'Studying the Bible for ourselves helps us learn about a God who loves us, cares for us, and has a plan for our lives.',
    'ministries.bibleStudies.link': 'Learn more →',
    'ministries.communityImpact.title': 'Community Impact',
    'ministries.communityImpact.description': 'We are striving to make a difference in the lives of all Vietnamese residents, regardless of religious affiliation.',
    'ministries.communityImpact.link': 'Get involved →',

    // Stories Section
    'stories.title': 'Stories of God at Work',
    'stories.subtitle': 'Inspiring stories and highlights about the impact God is making through our church community.',
    'stories.viewAll': 'View all stories →',

    // Events Section
    'events.title': 'Upcoming Events',
    'events.subtitle': 'Join us for these upcoming events and activities in our community.',
    'events.viewCalendar': 'View Full Calendar',

    // Contact Section
    'contact.title': 'Join us at the Vietnamese Evangelical Church',
    'contact.subtitle': "We're striving to love God and serve our community. Come be part of what God is building.",

    // Footer
    'footer.description': 'We are a simple community learning and growing in faith together. We believe in making God known through life-on-life discipleship and authentic relationships.',
    'footer.planVisit': 'Plan Your Visit',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.copyright': '© 2024 Vietnamese Evangelical Church. All rights reserved.',

    // ============ ADMIN SECTION ============
    
    // Admin Dashboard
    'admin.dashboard.title': 'Admin Dashboard',
    'admin.dashboard.subtitle': 'Manage your church content and programs',
    'admin.dashboard.events.title': 'Events Management',
    'admin.dashboard.events.description': 'Create, edit, and manage church events, services, and special programs.',
    'admin.dashboard.discipleship.title': 'Discipleship Courses',
    'admin.dashboard.discipleship.description': 'Manage discipleship courses, locations, and class schedules.',

    // Admin Events
    'admin.events.title': 'Events Management',
    'admin.events.subtitle': 'Create, edit, and manage your events',
    'admin.events.add': 'Add New Event',
    'admin.events.edit': 'Edit Event',
    'admin.events.delete': 'Delete Event',
    'admin.events.noEvents': 'No events yet',
    'admin.events.createFirst': 'Get started by creating your first event.',
    'admin.events.search': 'Search events...',
    'admin.events.allEvents': 'All Events',
    'admin.events.activeOnly': 'Active Only',
    'admin.events.inactiveOnly': 'Inactive Only',
    'admin.events.active': 'Active',
    'admin.events.inactive': 'Inactive',
    'admin.events.actions': 'Actions',
    'admin.events.location': 'Location',
    'admin.events.date': 'Date',
    'admin.events.status': 'Status',

    // Admin Event Form
    'admin.form.title': 'Title',
    'admin.form.subtitle': 'Subtitle',
    'admin.form.location': 'Location',
    'admin.form.startDate': 'Start Date & Time',
    'admin.form.endDate': 'End Date & Time',
    'admin.form.thumbnail': 'Thumbnail Image',
    'admin.form.hero': 'Hero Image',
    'admin.form.notes': 'Notes',
    'admin.form.isActive': 'Event is active and visible to users',
    'admin.form.recurring': 'Recurring event (repeats weekly)',
    'admin.form.save': 'Save Changes',
    'admin.form.create': 'Create Event',
    'admin.form.cancel': 'Cancel',
    'admin.form.saving': 'Saving...',
    'admin.form.required': 'Required',
    'admin.form.titleRequired': 'Title is required',
    'admin.form.selectImage': 'Select Image',
    'admin.form.changeImage': 'Change Image',
    'admin.form.uploadNew': 'Upload New Image',
    'admin.form.uploading': 'Uploading...',
    'admin.form.currentImage': 'Current Image:',

    // Admin Discipleship
    'admin.discipleship.title': 'Discipleship Courses',
    'admin.discipleship.subtitle': 'Manage courses, locations, and class schedules',
    'admin.discipleship.addCourse': 'Add New Course',
    'admin.discipleship.editCourse': 'Edit Course',
    'admin.discipleship.deleteCourse': 'Delete Course',
    'admin.discipleship.noCourses': 'No courses yet',
    'admin.discipleship.createFirstCourse': 'Get started by creating your first discipleship course.',
    
    'admin.discipleship.courseName': 'Course Name',
    'admin.discipleship.courseDescription': 'Description',
    'admin.discipleship.courseNamePlaceholder': 'e.g., Basic Discipleship',
    'admin.discipleship.descriptionPlaceholder': 'Brief description of the course...',
    
    'admin.discipleship.addLocation': 'Add Location',
    'admin.discipleship.editLocation': 'Edit Location',
    'admin.discipleship.deleteLocation': 'Delete Location',
    'admin.discipleship.noLocations': 'No locations added yet. Click "Add Location" to start.',
    'admin.discipleship.locationName': 'Location Name',
    'admin.discipleship.locationNamePlaceholder': 'e.g., Wake Forest University',
    
    'admin.discipleship.addClass': 'Add Class',
    'admin.discipleship.editClass': 'Edit Class',
    'admin.discipleship.deleteClass': 'Delete Class',
    'admin.discipleship.noClasses': 'No classes scheduled yet. Click "Add Class" to add one.',
    'admin.discipleship.classStartTime': 'Start Time',
    'admin.discipleship.classEndTime': 'End Time',
    'admin.discipleship.classContact': 'Contact',
    'admin.discipleship.classPassage': 'Bible Passage',
    'admin.discipleship.classPassagePlaceholder': 'e.g., John 3:16-21',
    'admin.discipleship.classContactPlaceholder': 'Phone or email',
    'admin.discipleship.classPreview': 'Preview',
    'admin.discipleship.classRecurringNote': 'Note: Classes recur weekly',
    'admin.discipleship.classRecurringDescription': 'Only the day of the week and time matter. The specific date will be used to determine the weekday.',
    
    'admin.discipleship.deleteWarningCourse': 'This will delete all locations and classes under this course.',
    'admin.discipleship.deleteWarningLocation': 'This will delete all classes at this location.',
    'admin.discipleship.deleteConfirm': 'Are you sure?',
    'admin.discipleship.deleteCannotUndo': 'This action cannot be undone.',

    // Admin Common
    'admin.common.edit': 'Edit',
    'admin.common.delete': 'Delete',
    'admin.common.save': 'Save',
    'admin.common.cancel': 'Cancel',
    'admin.common.back': 'Back',
    'admin.common.loading': 'Loading...',
    'admin.common.error': 'Error',
    'admin.common.success': 'Success',
    'admin.common.manage': 'Manage',
  },

  vi: {
    // Church Info
    'church.name': 'Hội Thánh Tin Lành Việt Nam',
    'church.subtitle': 'Vietnamese Evangelical Church',

    // Navigation
    'navigation.about': 'Về Chúng Tôi',
    'navigation.stories': 'Câu Chuyện',
    'navigation.events': 'Sự Kiện',
    'navigation.contact': 'Liên Hệ',
    'navigation.joinUs': 'Tham Gia',

    // Hero Section
    'hero.title': 'Làm Cho Chúa Được Biết',
    'hero.subtitle': 'Qua Cuộc Sống Cùng Nhau',
    'hero.description': 'Hãy tham gia cùng chúng tôi tại Hội Thánh Tin Lành Việt Nam khi chúng tôi khuyến khích nhau yêu mến Chúa và làm điều thiện. Chúng tôi là một cộng đồng đơn giản học hỏi và lớn lên trong đức tin cùng nhau.',
    'hero.planVisit': 'Lên Kế Hoạch Thăm Viếng',
    'hero.ourStories': 'Câu Chuyện Của Chúng Tôi',

    // Welcome Section
    'welcome.title': 'Chúng tôi vui mừng khi bạn ở đây',
    'welcome.description': 'Chúa Giê-su là một người đơn giản với một kế hoạch đơn giản để làm cho Chúa được biết. Cùng nhau, chúng tôi liên tục nhìn vào Chúa Giê-su qua Lời Chúa, được truyền cảm hứng để trở thành bất cứ điều gì định mệnh yêu cầu.',

    // Ministries Section
    'ministries.title': 'Chúng tôi là một hội thánh dành riêng để đi cùng với Chúa',
    'ministries.subtitle': 'Chúng tôi tin rằng điều làm cho hội thánh đặc biệt không chỉ là bài giảng Chủ nhật, mà còn là những kết nối thuộc linh chúng tôi xây dựng với Chúa và với nhau.',
    'ministries.sundayServices.title': 'Thờ Phượng Chủ Nhật',
    'ministries.sundayServices.description': 'Hãy tham gia cùng chúng tôi cho những thông điệp hấp dẫn và xây dựng đức tin từ Kinh Thánh, cùng với ca hát, giao thông, và các lớp học cho trẻ em.',
    'ministries.sundayServices.link': 'Xem giờ →',
    'ministries.smallGroups.title': 'Nhóm Nhỏ',
    'ministries.smallGroups.description': 'Kết nối với bạn bè ở cùng một điểm cuộc sống trong khu phố của bạn. Hiểu biết nhau ở mức độ sâu hơn thông qua các cuộc thảo luận về Chúa và cuộc sống.',
    'ministries.smallGroups.link': 'Kết nối →',
    'ministries.bibleStudies.title': 'Nghiên Cứu Kinh Thánh',
    'ministries.bibleStudies.description': 'Nghiên cứu Kinh Thánh cho chính mình giúp chúng ta học về một Chúa yêu thương chúng ta, chăm sóc chúng ta, và có kế hoạch cho cuộc sống của chúng ta.',
    'ministries.bibleStudies.link': 'Tìm hiểu thêm →',
    'ministries.communityImpact.title': 'Tác Động Cộng Đồng',
    'ministries.communityImpact.description': 'Chúng tôi đang nỗ lực tạo ra sự khác biệt trong cuộc sống của tất cả cư dân Việt Nam, bất kể tôn giáo.',
    'ministries.communityImpact.link': 'Tham gia →',

    // Stories Section
    'stories.title': 'Câu Chuyện Về Công Việc Của Chúa',
    'stories.subtitle': 'Những câu chuyện truyền cảm hứng và điểm nổi bật về tác động Chúa đang tạo ra qua cộng đồng hội thánh của chúng tôi.',
    'stories.viewAll': 'Xem tất cả câu chuyện →',

    // Events Section
    'events.title': 'Sự Kiện Sắp Tới',
    'events.subtitle': 'Hãy tham gia cùng chúng tôi cho những sự kiện và hoạt động sắp tới trong cộng đồng của chúng tôi.',
    'events.viewCalendar': 'Xem Lịch Đầy Đủ',

    // Contact Section
    'contact.title': 'Hãy tham gia cùng chúng tôi tại Hội Thánh Tin Lành Việt Nam',
    'contact.subtitle': 'Chúng tôi đang nỗ lực yêu mến Chúa và phục vụ cộng đồng của chúng tôi. Hãy đến và là một phần của những gì Chúa đang xây dựng.',

    // Footer
    'footer.description': 'Chúng tôi là một cộng đồng đơn giản học hỏi và lớn lên trong đức tin cùng nhau. Chúng tôi tin vào việc làm cho Chúa được biết qua môn đồ hóa đời sống và những mối quan hệ chân thật.',
    'footer.planVisit': 'Lên Kế Hoạch Thăm Viếng',
    'footer.quickLinks': 'Liên Kết Nhanh',
    'footer.contactInfo': 'Thông Tin Liên Hệ',
    'footer.copyright': '© 2024 Hội Thánh Tin Lành Việt Nam. Tất cả quyền được bảo lưu.',

    // ============ ADMIN SECTION (Vietnamese) ============
    
    // Admin Dashboard
    'admin.dashboard.title': 'Bảng Điều Khiển',
    'admin.dashboard.subtitle': 'Quản lý nội dung và chương trình nhà thờ',
    'admin.dashboard.events.title': 'Quản Lý Sự Kiện',
    'admin.dashboard.events.description': 'Tạo, chỉnh sửa và quản lý sự kiện nhà thờ, dịch vụ và chương trình đặc biệt.',
    'admin.dashboard.discipleship.title': 'Khóa Đào Tạo Môn Đồ',
    'admin.dashboard.discipleship.description': 'Quản lý khóa học đào tạo môn đồ, địa điểm và lịch học.',

    // Admin Events
    'admin.events.title': 'Quản Lý Sự Kiện',
    'admin.events.subtitle': 'Tạo, chỉnh sửa và quản lý sự kiện',
    'admin.events.add': 'Thêm Sự Kiện Mới',
    'admin.events.edit': 'Chỉnh Sửa Sự Kiện',
    'admin.events.delete': 'Xóa Sự Kiện',
    'admin.events.noEvents': 'Chưa có sự kiện nào',
    'admin.events.createFirst': 'Bắt đầu bằng cách tạo sự kiện đầu tiên.',
    'admin.events.search': 'Tìm kiếm sự kiện...',
    'admin.events.allEvents': 'Tất Cả Sự Kiện',
    'admin.events.activeOnly': 'Chỉ Hoạt Động',
    'admin.events.inactiveOnly': 'Chỉ Không Hoạt Động',
    'admin.events.active': 'Hoạt động',
    'admin.events.inactive': 'Không hoạt động',
    'admin.events.actions': 'Hành động',
    'admin.events.location': 'Địa điểm',
    'admin.events.date': 'Ngày',
    'admin.events.status': 'Trạng thái',

    // Admin Event Form
    'admin.form.title': 'Tiêu Đề',
    'admin.form.subtitle': 'Phụ Đề',
    'admin.form.location': 'Địa Điểm',
    'admin.form.startDate': 'Ngày & Giờ Bắt Đầu',
    'admin.form.endDate': 'Ngày & Giờ Kết Thúc',
    'admin.form.thumbnail': 'Ảnh Thumbnail',
    'admin.form.hero': 'Ảnh Hero',
    'admin.form.notes': 'Ghi Chú',
    'admin.form.isActive': 'Sự kiện đang hoạt động và hiển thị',
    'admin.form.recurring': 'Sự kiện lặp lại (hàng tuần)',
    'admin.form.save': 'Lưu Thay Đổi',
    'admin.form.create': 'Tạo Sự Kiện',
    'admin.form.cancel': 'Hủy',
    'admin.form.saving': 'Đang lưu...',
    'admin.form.required': 'Bắt buộc',
    'admin.form.titleRequired': 'Tiêu đề là bắt buộc',
    'admin.form.selectImage': 'Chọn Ảnh',
    'admin.form.changeImage': 'Đổi Ảnh',
    'admin.form.uploadNew': 'Tải Ảnh Mới Lên',
    'admin.form.uploading': 'Đang tải lên...',
    'admin.form.currentImage': 'Ảnh hiện tại:',

    // Admin Discipleship
    'admin.discipleship.title': 'Khóa Đào Tạo Môn Đồ',
    'admin.discipleship.subtitle': 'Quản lý khóa học, địa điểm và lịch học',
    'admin.discipleship.addCourse': 'Thêm Khóa Học Mới',
    'admin.discipleship.editCourse': 'Chỉnh Sửa Khóa Học',
    'admin.discipleship.deleteCourse': 'Xóa Khóa Học',
    'admin.discipleship.noCourses': 'Chưa có khóa học nào',
    'admin.discipleship.createFirstCourse': 'Bắt đầu bằng cách tạo khóa học đào tạo đầu tiên.',
    
    'admin.discipleship.courseName': 'Tên Khóa Học',
    'admin.discipleship.courseDescription': 'Mô Tả',
    'admin.discipleship.courseNamePlaceholder': 'ví dụ: Đào Tạo Cơ Bản',
    'admin.discipleship.descriptionPlaceholder': 'Mô tả ngắn về khóa học...',
    
    'admin.discipleship.addLocation': 'Thêm Địa Điểm',
    'admin.discipleship.editLocation': 'Chỉnh Sửa Địa Điểm',
    'admin.discipleship.deleteLocation': 'Xóa Địa Điểm',
    'admin.discipleship.noLocations': 'Chưa có địa điểm nào. Nhấp "Thêm Địa Điểm" để bắt đầu.',
    'admin.discipleship.locationName': 'Tên Địa Điểm',
    'admin.discipleship.locationNamePlaceholder': 'ví dụ: Đại Học Wake Forest',
    
    'admin.discipleship.addClass': 'Thêm Lớp',
    'admin.discipleship.editClass': 'Chỉnh Sửa Lớp',
    'admin.discipleship.deleteClass': 'Xóa Lớp',
    'admin.discipleship.noClasses': 'Chưa có lớp nào. Nhấp "Thêm Lớp" để thêm.',
    'admin.discipleship.classStartTime': 'Giờ Bắt Đầu',
    'admin.discipleship.classEndTime': 'Giờ Kết Thúc',
    'admin.discipleship.classContact': 'Liên Hệ',
    'admin.discipleship.classPassage': 'Đoạn Kinh Thánh',
    'admin.discipleship.classPassagePlaceholder': 'ví dụ: Giăng 3:16-21',
    'admin.discipleship.classContactPlaceholder': 'Điện thoại hoặc email',
    'admin.discipleship.classPreview': 'Xem Trước',
    'admin.discipleship.classRecurringNote': 'Lưu ý: Lớp học lặp lại hàng tuần',
    'admin.discipleship.classRecurringDescription': 'Chỉ ngày trong tuần và giờ học quan trọng. Ngày cụ thể sẽ được dùng để xác định thứ.',
    
    'admin.discipleship.deleteWarningCourse': 'Điều này sẽ xóa tất cả địa điểm và lớp học thuộc khóa này.',
    'admin.discipleship.deleteWarningLocation': 'Điều này sẽ xóa tất cả lớp học tại địa điểm này.',
    'admin.discipleship.deleteConfirm': 'Bạn có chắc chắn?',
    'admin.discipleship.deleteCannotUndo': 'Hành động này không thể hoàn tác.',

    // Admin Common
    'admin.common.edit': 'Sửa',
    'admin.common.delete': 'Xóa',
    'admin.common.save': 'Lưu',
    'admin.common.cancel': 'Hủy',
    'admin.common.back': 'Quay lại',
    'admin.common.loading': 'Đang tải...',
    'admin.common.error': 'Lỗi',
    'admin.common.success': 'Thành công',
    'admin.common.manage': 'Quản lý',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'vi')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}