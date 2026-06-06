export const getNotificationContent = (notif, t) => {
    const eventKey = notif?.type || notif?.title || "";

    const data =
        typeof notif?.data === "string"
            ? JSON.parse(notif.data)
            : notif?.data || {};
    console.log(notif, eventKey, data);
    // ACHIEVEMENT
    const achievementSlug = data?.achievementSlug;

    const achievementName = achievementSlug
        ? t(`achievements.achievementsData.${achievementSlug}.title`, {
            defaultValue: achievementSlug,
        })
        : "";

    // RANK
    const rankSlug =
        data?.newRank?.icon ||
        data?.newRank?.slug ||
        data?.newRank?.name;

    const rankName = rankSlug
        ? t(`achievements.ranks.${rankSlug}.name`, {
            defaultValue: data?.newRank?.name || rankSlug,
        })
        : "";

    const title = t(`notifications.events.${eventKey}.title`, {
        defaultValue: notif?.title || "Notification",
    });

    const newCount = data?.newCount ?? 1;
    const messageKey = (eventKey === "LAW_UPDATE" && newCount > 1)
        ? `notifications.events.LAW_UPDATE.messageMany`
        : `notifications.events.${eventKey}.message`;

    const body = t(messageKey, {
        defaultValue: notif?.body || notif?.message || "",
        achievementName,
        rankName,
        xp: data?.xp,
        institutionName: data?.institutionName ?? "",
        newsTitle: data?.newsTitle ?? "",
        newCount,
    });

    return {
        title,
        body,
        data,
    };
};