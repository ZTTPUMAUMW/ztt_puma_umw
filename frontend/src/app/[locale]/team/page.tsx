'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Hero from "@/components/Hero";
import TeamCard, { TeamMember } from "@/components/TeamCard";
import TeamModal from "@/components/TeamModal";

import { italicizeLatinWords } from "@/lib/utils";
import TabbedSection from "@/components/TabbedSection";
import { teamMembers as teamMembersPl } from "@/data/teamMembers.pl";
import { teamMembers as teamMembersEn } from "@/data/teamMembers.en";
import styles from '@/styles/components/team-stats.module.scss';
import teamStyles from '@/styles/pages/team.module.scss';

// TODO: Refactor to fetch team members from SanityCMS instead of static data, and implement search/filter functionality for better user experience with larger teams in the future.
export default function TeamPage() {
  const t = useTranslations('team');
  const locale = useLocale();
  const teamMembers = locale === 'en' ? teamMembersEn : teamMembersPl;
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pracownicy' | 'doktoranci' | 'studenci'>('pracownicy');

  const processedTeamMembers = {
    pracownicy: teamMembers.pracownicy.map(member => ({
      ...member,
      copy: italicizeLatinWords(member.copy)
    })),
    doktoranci: teamMembers.doktoranci.map(member => ({
      ...member,
      copy: italicizeLatinWords(member.copy)
    })),
    studenci: teamMembers.studenci.map(member => ({
      ...member,
      copy: italicizeLatinWords(member.copy)
    }))
  };

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedMember) return;

    const currentCategory = processedTeamMembers[activeTab];
    const currentIndex = currentCategory.findIndex(m => m.id === selectedMember.id);
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentCategory.length - 1;
    } else {
      newIndex = currentIndex < currentCategory.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedMember(currentCategory[newIndex]);
  };

  return (
    <>
      <Hero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className={styles['team-intro__section']}>
        <div className="container-content">
          <p className={styles['team-intro__text']}>
            {t('stats.intro')}
          </p>
        </div>
      </section>

      <TabbedSection
        tabs={[
          {
            key: 'pracownicy',
            label: t('tabs.researchers'),
            content: () => (
              <section className={teamStyles['team--section']}>
                <div className={teamStyles['team--grid']}>
                  {processedTeamMembers.pracownicy.map((member) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      onOpenModal={handleOpenModal}
                    />
                  ))}
                </div>
              </section>
            ),
          },
          {
            key: 'doktoranci',
            label: t('tabs.phd'),
            content: () => (
              <section className={teamStyles['team--section']}>
                <div className={[teamStyles['team--grid'], teamStyles['team--grid--three']].filter(Boolean).join(' ')}>
                  {processedTeamMembers.doktoranci.map((member) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      onOpenModal={handleOpenModal}
                    />
                  ))}
                </div>
              </section>
            ),
          },
          {
            key: 'studenci',
            label: t('tabs.students'),
            content: () => (
              <section className={teamStyles['team--section']}>
                <div className={[teamStyles['team--grid'], teamStyles['team--grid--three']].filter(Boolean).join(' ')}>
                  {processedTeamMembers.studenci.map((member) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      onOpenModal={handleOpenModal}
                    />
                  ))}
                </div>
              </section>
            ),
          },
        ]}
        activeKey={activeTab}
        onTabChange={key => setActiveTab(key as typeof activeTab)}
        className=""
        tabClassName=""
        panelClassName="team"
      />

      <TeamModal
        isOpen={isModalOpen}
        member={selectedMember}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  );
}
